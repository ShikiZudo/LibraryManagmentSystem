import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BookServices, {
  Page,
  bookRequest,
  bookResponse,
} from "@/services/BookServices";
import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";
import { BookCard } from "./BookCard";
import { Plus, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Button } from "@/components/ui/button";
import { FilterBox } from "./FilterBox";
import { filterOptions, sortOptions } from "@/lib/enums";
import { MobileFilterSort } from "./MobileFilterSort";
import { cn } from "@/lib/utils";
import { FooterInternal } from "@/components/FooterInternal";
import { Loading } from "@/components/Loading";
import { ErrorPage } from "@/components/ErrorPage";
import { ComboBoxResponsive } from "./ComboBoxResponsive";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@radix-ui/react-toast";
import { useToast } from "@/components/ui/use-toast";

export const BookList = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);
  const [book, setBook] = useState<bookRequest>({
    title: "",
    isbn: "",
    authorName: "",
    publisherName: "",
    edition: "",
    description: "",
    language: "",
    pages: 0,
    cost: 0,
    bookCount: 0,
    link: "",
    imageURL: "not given",
  });
  const [serchName, setSearchName] = useState<string | null>();
  const [searchList, setSearchList] = useState<bookResponse[] | null>([]);
  const {
    status,
    error,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<Page, Error>({
    queryKey: ["posts"],
    getNextPageParam: (lastPage: Page) => lastPage.nextPage,
    /**
     * Explaining comment
     *
     * @ts-expect-error */
    queryFn: ({ pageParam = 0 }: { pageParam: number }) =>
      BookServices.getAllBooks(pageParam),
  });

  const [sort, setSort] = useState<sortOptions>(sortOptions.ALPHABETICAL);
  const [filterPageNo, setFilterPageNo] = useState<number>(0);
  const [filterRequestData, setFilterRequestData] = useState<{
    authorList: string[];
    categoryList: string[];
    languageList: string[];
  }>({
    authorList: [],
    categoryList: [],
    languageList: [],
  });
  const [filter, setFilter] = useState<
    {
      type: filterOptions;
      filterElement: string[];
    }[]
  >([
    {
      type: filterOptions.AUTHOR,
      filterElement: [],
    },
    {
      type: filterOptions.CATEGORY,
      filterElement: [],
    },
    {
      type: filterOptions.LANGUAGE,
      filterElement: [],
    },
  ]);

  const {
    data: languageData,
    status: languageStatus,
    error: languageError,
  } = useQuery({
    queryKey: ["bookLanguage"],
    queryFn: () => BookServices.getLanguage(),
  });
  const {
    data: categoryData,
    status: categoryStatus,
    error: categoryError,
  } = useQuery({
    queryKey: ["bookCategories"],
    queryFn: () => BookServices.getCategory(),
  });
  const {
    data: authorData,
    status: authorStatus,
    error: authorError,
  } = useQuery({
    queryKey: ["bookAuthor"],
    queryFn: () => BookServices.getAuthor(),
  });
  if (authorStatus === "error") console.log(authorError);
  if (languageStatus === "error") console.log(languageError);
  if (categoryStatus === "error") console.log(categoryError);

  useEffect(() => {
    if (
      categoryStatus === "success" &&
      languageStatus === "success" &&
      authorStatus === "success"
    ) {
      const tempFilter = [
        {
          type: filterOptions.AUTHOR,
          filterElement: [...authorData],
        },
        {
          type: filterOptions.CATEGORY,
          filterElement: [...categoryData],
        },
        {
          type: filterOptions.LANGUAGE,
          filterElement: [...languageData],
        },
      ];
      setFilter(tempFilter);
    }
  }, [categoryData, authorData, languageData]);

  const emptyBooleanArray = (filterType: filterOptions) => {
    let index = 0;
    filter.map((ele, ind) => {
      if (ele.type === filterType) index = ind;
    });
    return [
      ...Array.from({
        length: filter[index].filterElement.length,
      }).map((_) => false),
    ];
  };

  const [selected, setSelected] = useState<
    {
      type: filterOptions;
      state: boolean[];
    }[]
  >([
    {
      type: filterOptions.AUTHOR,
      state: emptyBooleanArray(filterOptions.AUTHOR),
    },
    {
      type: filterOptions.CATEGORY,
      state: emptyBooleanArray(filterOptions.CATEGORY),
    },
    {
      type: filterOptions.LANGUAGE,
      state: emptyBooleanArray(filterOptions.LANGUAGE),
    },
  ]);
  const [bookFilterList, setBookFilterList] = useState<{
    data: bookResponse[];
    nextPage: number | undefined;
    prevPage: number | undefined;
  }>({
    data: [],
    nextPage: undefined,
    prevPage: undefined,
  });
  useEffect(() => {
    const setFilter = async () => {
      const authorList: string[] = [];
      for (let index = 0; index < selected[0].state.length; index++) {
        const element = selected[0].state[index];
        if (element) {
          authorList.push(filter[0].filterElement[index]);
        }
      }
      const categoryList: string[] = [];
      for (let index = 0; index < selected[1].state.length; index++) {
        const element = selected[1].state[index];
        if (element) {
          categoryList.push(filter[1].filterElement[index]);
        }
      }
      const languageList: string[] = [];
      for (let index = 0; index < selected[2].state.length; index++) {
        const element = selected[2].state[index];
        if (element) {
          languageList.push(filter[2].filterElement[index]);
        }
      }
      const filterList = {
        authorList: [...authorList],
        categoryList: [...categoryList],
        languageList: [...languageList],
      };
      setFilterRequestData(filterList);
      const bookFilterListRender = await BookServices.getBookFilterPage(
        0,
        filterList
      );
      setBookFilterList(bookFilterListRender);
      setFilterPageNo(0);
    };
    setFilter();
  }, [setSelected, selected, filter]);

  useEffect(() => {
    const filterNewPageAdd = async () => {
      if (
        bookFilterList.nextPage &&
        bookFilterList.nextPage - 1 === filterPageNo
      )
        return;
      if (
        bookFilterList.prevPage &&
        bookFilterList.prevPage + 1 === filterPageNo
      )
        return;
      const bookFilterListRender = await BookServices.getBookFilterPage(
        filterPageNo,
        filterRequestData
      );
      const tempData = {
        data: [...bookFilterList.data, ...bookFilterListRender.data],
        nextPage: bookFilterListRender.nextPage,
        prevPage: bookFilterList.prevPage,
      };
      setBookFilterList(tempData);
    };
    filterNewPageAdd();
  }, [filterPageNo]);

  const handleChange = (e: SelectChangeEvent) => {
    const selected =
      sortOptions.ALPHABETICAL === e.target.value
        ? sortOptions.ALPHABETICAL
        : sortOptions.NEWEST === e.target.value
        ? sortOptions.NEWEST
        : sortOptions.POPULARITY === e.target.value
        ? sortOptions.POPULARITY
        : sortOptions.PRICE === e.target.value
        ? sortOptions.PRICE
        : sortOptions.ALPHABETICAL;
    setSort(selected);
  };

  const handleRemoveFilter = (index: number, ind: number) => {
    const tempSelected = [...selected];
    tempSelected[index] = {
      ...tempSelected[index],
      state: [...tempSelected[index].state],
    };
    tempSelected[index].state[ind] = false;
    setSelected(tempSelected);
  };

  const handleAddBook = async () => {
    BookServices.addBook(book).then((res) => {
      toast({
        title: "Book Added!.",
        description: "Your Book have been Added to the server.",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
    });
    console.log(book);
    setOpen(false);
  };

  if (status === "pending") {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Loading />
      </div>
    );
  }

  if (status === "error") {
    console.log(error);
    return <ErrorPage />;
  }

  return (
    <div className="w-full p-0 m-0">
      <MaxWidthWrapper className=" max-w-[84rem] bg-white">
        <div className=" h-full w-[100%] md:h-[50vh] overflow-hidden  bg-violet-50 flex justify-center items-center">
          <img src="./bp.png" alt="" className=" w-full p-0 md:pb-60" />
        </div>
        <div className=" px-2">
          <div>
            <div className=" mt-10 min-h-28 hidden lg:flex flex-row items-center justify-between pl-[25%]">
              <div className="flex flex-col justify-start items-start h-full w-[70%] pt-4">
                <Typography
                  variant="overline"
                  display="block"
                  gutterBottom
                  sx={{
                    color: "#aaacaf",
                    marginY: "-4px",
                  }}
                >
                  {`Home / Book List / " ${
                    serchName ? serchName.toUpperCase() : null
                  } "`}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  sx={{
                    color: "#5b5c5e",
                    display: "inline",
                    marginY: "-4px",
                  }}
                >
                  BookList items -
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    sx={{ color: "#aaacaf", display: "inline" }}
                  >
                    {23}
                  </Typography>
                </Typography>
                <div className="mt-4 flex flex-row flex-wrap ">
                  {selected.map((filterType, index) =>
                    filterType.state.map(
                      (ele, ind) =>
                        ele && (
                          <div
                            key={ind}
                            className="mr-3 flex flex-row justify-center items-center  rounded-3xl px-3 w-fit h-7 border border-violet-300 bg-violet-50"
                          >
                            <div>{`${selected[index].type}:${filter[index].filterElement[ind]}`}</div>
                            <Button
                              variant="ghost"
                              className="p-0 m-0 pl-2 hover:bg-transparent"
                              onClick={() => handleRemoveFilter(index, ind)}
                            >
                              <X size={"16px"} color="gray" />
                            </Button>
                          </div>
                        )
                    )
                  )}
                </div>
              </div>
              <div>
                <ComboBoxResponsive
                  setName={setSearchName}
                  setList={setSearchList}
                />
              </div>
              <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
                <InputLabel id="demo-select-small-label">
                  Select Sorting Options
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={sort}
                  label="Select Sorting Options"
                  onChange={handleChange}
                >
                  <MenuItem value={sortOptions.ALPHABETICAL}>
                    {sortOptions.ALPHABETICAL}
                  </MenuItem>
                  <MenuItem value={sortOptions.POPULARITY}>
                    {sortOptions.POPULARITY}
                  </MenuItem>
                  <MenuItem value={sortOptions.NEWEST}>
                    {sortOptions.NEWEST}
                  </MenuItem>
                  <MenuItem value={sortOptions.PRICE}>
                    {sortOptions.PRICE}
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="flex flex-row gap-4 mt-4">
              {/* Side bar*/}
              <div className="hidden lg:block w-[24%] border-[1px] border-gray-300 border-l-0 border-b-0 h-fit ml-5">
                <FilterBox
                  filter={filter}
                  filterName={filterOptions.AUTHOR}
                  selected={selected}
                  setSelected={setSelected}
                />
                <hr className="mt-5 border-[1px] border-gray-300 mr-3" />
                <FilterBox
                  filter={filter}
                  filterName={filterOptions.CATEGORY}
                  selected={selected}
                  setSelected={setSelected}
                />
                <hr className="mt-5 border-[1px] border-gray-300 mr-3" />
                <FilterBox
                  filter={filter}
                  filterName={filterOptions.LANGUAGE}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
              {/* book container */}
              {searchList && searchList.length > 0 ? (
                <div className="flex flex-col w-full h-full">
                  <div
                    className={cn(
                      " w-full h-fit flex flex-row flex-wrap justify-center gap-0 sm:gap-2 items-center pt-2 border-t-[1px] border-gray-300 "
                    )}
                  >
                    {searchList.map((book) => (
                      <BookCard key={book.id} bookData={book} />
                    ))}
                  </div>
                  {bookFilterList.nextPage && (
                    <Button
                      className={cn("p-0 block", {
                        " bg-black ": bookFilterList.nextPage === undefined,
                      })}
                      onClick={() => {
                        if (bookFilterList.nextPage)
                          setFilterPageNo((old) => old + 1);
                      }}
                    >
                      Load More
                    </Button>
                  )}
                </div>
              ) : bookFilterList.data.length > 0 ? (
                <div className="flex flex-col w-full h-full">
                  <div
                    className={cn(
                      " w-full h-fit flex flex-row flex-wrap justify-center gap-0 sm:gap-2 items-center pt-2 border-t-[1px] border-gray-300 "
                    )}
                  >
                    {bookFilterList.data.map((book) => (
                      <BookCard key={book.id} bookData={book} />
                    ))}
                  </div>
                  {bookFilterList.nextPage && (
                    <Button
                      className={cn("p-0 block", {
                        " bg-black ": bookFilterList.nextPage === undefined,
                      })}
                      onClick={() => {
                        if (bookFilterList.nextPage)
                          setFilterPageNo((old) => old + 1);
                      }}
                    >
                      Load More
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col w-full h-full">
                  <div
                    className={cn(
                      " w-full h-fit flex flex-row flex-wrap justify-center gap-0 sm:gap-2 items-center pt-2 border-t-[1px] border-gray-300 "
                    )}
                  >
                    <div className="flex flex-col h-[30rem] w-[15rem] justify-between border-0 mb-3 mx-1 ">
                      <Dialog open={open}>
                        <div className="bg-violet-100 h-full border-purple-400 border-2 rounded-lg mb-[7rem] flex justify-center items-center w-full">
                          <DialogTrigger asChild onClick={() => setOpen(true)}>
                            <Plus className="h-[6rem] w-[6rem] hover:w-[8rem]  hover:h-[8rem] transition-all duration-500  text-purple-700" />
                          </DialogTrigger>
                        </div>
                        <DialogContent
                          className="sm:max-w-[50rem]"
                          onPointerDownOutside={() => setOpen(false)}
                        >
                          <DialogHeader>
                            <DialogTitle>Edit Book</DialogTitle>
                            <DialogDescription>
                              Make changes to your book here. Click save when
                              you're done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-4 py-4">
                            <div className="grid grid-row-2  items-center gap-4">
                              <Label htmlFor="title" className="text-left">
                                title
                              </Label>
                              <Input
                                id="title"
                                defaultValue={book.title}
                                onChange={(e) =>
                                  setBook({ ...book, title: e.target.value })
                                }
                                className=""
                              />
                            </div>
                            <div className="grid grid-row-2  items-center gap-4">
                              <Label htmlFor="isbn" className="text-left">
                                isbn
                              </Label>
                              <Input
                                id="isbn"
                                defaultValue={book.isbn}
                                onChange={(e) =>
                                  setBook({ ...book, isbn: e.target.value })
                                }
                                className=""
                              />
                            </div>
                            <div className="grid grid-row-2  items-center gap-4">
                              <Label htmlFor="authorName" className="text-left">
                                authorName
                              </Label>
                              <Input
                                id="authorName"
                                defaultValue={book.authorName}
                                onChange={(e) =>
                                  setBook({
                                    ...book,
                                    authorName: e.target.value,
                                  })
                                }
                                className=""
                              />
                            </div>
                            <div className="grid grid-row-2  items-center gap-4">
                              <Label
                                htmlFor="publisherName"
                                className="text-left"
                              >
                                publisherName
                              </Label>
                              <Input
                                id="publisherName"
                                defaultValue={book.publisherName}
                                onChange={(e) =>
                                  setBook({
                                    ...book,
                                    publisherName: e.target.value,
                                  })
                                }
                                className=""
                              />
                            </div>
                            <div className="grid grid-row-2  items-center gap-4">
                              <Label htmlFor="edition" className="text-left">
                                edition
                              </Label>
                              <Input
                                id="edition"
                                defaultValue={book.edition}
                                onChange={(e) =>
                                  setBook({ ...book, edition: e.target.value })
                                }
                                className=""
                              />
                            </div>
                            <div className="grid grid-row-2  items-center gap-4">
                              <Label
                                htmlFor="description"
                                className="text-left"
                              >
                                description
                              </Label>
                              <Input
                                id="description"
                                defaultValue={book.description}
                                onChange={(e) =>
                                  setBook({
                                    ...book,
                                    description: e.target.value,
                                  })
                                }
                                className=""
                              />
                            </div>
                            <div className="grid grid-row-2  items-center gap-4">
                              <Label htmlFor="language" className="text-left">
                                language
                              </Label>
                              <Input
                                id="language"
                                defaultValue={book.language}
                                onChange={(e) =>
                                  setBook({ ...book, language: e.target.value })
                                }
                                className=""
                              />
                            </div>
                            <div className="grid grid-row-2  items-center gap-4">
                              <Label htmlFor="pages" className="text-left">
                                pages
                              </Label>
                              <Input
                                id="pages"
                                defaultValue={book.pages}
                                onChange={(e) =>
                                  setBook({
                                    ...book,
                                    pages: parseInt(e.target.value),
                                  })
                                }
                                className=""
                              />
                            </div>
                            <div className="grid grid-row-2  items-center gap-4">
                              <Label htmlFor="cost" className="text-left">
                                cost
                              </Label>
                              <Input
                                id="cost"
                                defaultValue={book.cost}
                                onChange={(e) =>
                                  setBook({
                                    ...book,
                                    cost: parseInt(e.target.value),
                                  })
                                }
                                className=""
                              />
                            </div>
                            <div className="grid grid-row-2  items-center gap-4">
                              <Label htmlFor="bookCount" className="text-left">
                                bookCount
                              </Label>
                              <Input
                                id="bookCount"
                                defaultValue={book.bookCount}
                                onChange={(e) =>
                                  setBook({
                                    ...book,
                                    bookCount: parseInt(e.target.value),
                                  })
                                }
                                className=""
                              />
                            </div>
                            <div className="grid grid-row-2  items-center gap-4">
                              <Label htmlFor="link" className="text-left">
                                link
                              </Label>
                              <Input
                                id="link"
                                defaultValue={book.link}
                                onChange={(e) =>
                                  setBook({ ...book, link: e.target.value })
                                }
                                className=""
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" onClick={handleAddBook}>
                              Save changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    {data &&
                      data.pages.map((page) =>
                        /**
                         * Explaining comment
                         *
                         * @ts-expect-error */
                        page.data.map((book: bookResponse) => (
                          <BookCard key={book.id} bookData={book} />
                        ))
                      )}
                  </div>
                  {hasNextPage && (
                    <Button
                      className={cn("p-0 mb-2 block", {
                        " bg-violet-950 hover:bg-violet-800 ":
                          bookFilterList.nextPage === undefined,
                      })}
                      disabled={isFetchingNextPage}
                      onClick={() => fetchNextPage()}
                    >
                      Load More
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
      <div className="">
        <FooterInternal />
      </div>
      <MobileFilterSort
        filter={filter}
        setFilter={setFilter}
        selected={selected}
        setSelected={setSelected}
        setSort={setSort}
        sort={sort}
      />
    </div>
  );
};
