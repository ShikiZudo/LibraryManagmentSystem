import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BookInfoImg from "./BookInfoImg";
import BookInfoMainInfo from "./BookInfoMainInfo";
import { useQuery } from "@tanstack/react-query";
import BookServices from "@/services/BookServices";
import { useAuthorization } from "@/context/AuthorizationProvider";
import { ErrorPage } from "@/components/ErrorPage";
import { Loading } from "@/components/Loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useEffect, useState } from "react";

const BookInfoBase = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const id = bookId ? bookId : "1";
  const { data, status, error } = useQuery({
    queryKey: ["books", bookId],
    queryFn: () => BookServices.getBookById(parseInt(id)),
  });
  const { data: catgoryData } = useQuery({
    queryKey: ["bookcategory", bookId],
    queryFn: () => BookServices.getCategoryByBookId(data ? data?.id : 0),
  });

  const [filterRequest, setFilterRequest] = useState({
    authorList: [""],
    categoryList: [""],
    languageList: [""],
  });

  useEffect(() => {
    if (data && catgoryData) {
      setFilterRequest({
        authorList: [data.authorName],
        categoryList: [...catgoryData],
        languageList: [data.language],
      });
    }
  }, [data, catgoryData]);

  const { data: filterData, status: filterStatus } = useQuery({
    queryKey: ["books", filterRequest],
    queryFn: () => BookServices.getBooksByFilter(filterRequest),
  });

  //getting user context
  const auth = useAuthorization();
  console.log(auth.getAuthData?.id);

  const handleSubmit = (id: number) => {
    navigate(`/bookinfo/${id}`);
  };

  if (status === "pending") return <Loading />;
  if (status === "error") return <ErrorPage />;
  return (
    <MaxWidthWrapper className=" max-w-[86rem] ">
      <div className=" bg-white">
        <div className="flex flex-row justify-center border border-b-0 bg-white w-full min-h-screen">
          <div className="flex flex-col justify-start pt-4 w-[40%]">
            <BookInfoImg imageUrl={"data:image/jpeg;base64," + data.imageURL} />
            <div className="flex flex-row justify-center">
              <img
                src={"data:image/jpeg;base64," + data.imageURL}
                className="h-28 w-20 hover:filter hover:brightness-75"
                alt=""
              />
              <img
                src={"data:image/jpeg;base64," + data.imageURL}
                className="h-28 w-20 ml-8 hover:filter hover:brightness-75"
                alt=""
              />
            </div>
          </div>
          <div className="h-[92vh] mt-8 border-r-2 border-violet-200"></div>
          <div className="w-[49%] pl-8">
            <BookInfoMainInfo bookdata={data} />
          </div>
        </div>
        <div className="border-b-2 border-violet-200 w-full mb-10"></div>
        <div className="pb-16">
          <div
            className={cn(
              "border flex flex-col items-center justify-center rounded-lg  max-w-[86rem] bg-violet-50",
              {
                "lg:flex-row": true,
                "lg:flex-row-reverse": false,
              }
            )}
          >
            <div
              className={cn(
                "lg:h-[22.5rem] lg:w-40 flex justify-center items-center"
              )}
            >
              <h1
                className={cn("lg:inline text-6xl font-black text-violet-900", {
                  "lg:-rotate-90": true,
                  "lg:rotate-90": false,
                })}
              >
                Similar Books
              </h1>
            </div>
            <Carousel
              className={cn(
                "w-[70%] lg:w-[90%] pl-4 max-w-screen-sm md:max-w-screen-md  lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl lg:rounded-lg",
                {
                  "lg:pl-10": true,
                  "lg:pr-10": false,
                }
              )}
            >
              <CarouselContent className="w-full">
                {filterStatus === "pending" ? (
                  <Loading />
                ) : filterStatus === error ? (
                  <ErrorPage />
                ) : (
                  filterStatus === "success" &&
                  filterData.map((bookData, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-1 md:basis-1/2 lg:basis-1/3  xl:basis-1/4"
                    >
                      <div className="p-1 flex justify-center">
                        <Card
                          onClick={() => handleSubmit(bookData.id)}
                          className="flex flex-col h-[23rem] w-[16rem] justify-between border-0"
                        >
                          <CardContent className="w-full p-0 m-0 transition-all ease-in-out overflow-hidden group rounded-lg">
                            {/* <div className="flex justify-center items-center"> */}
                            <img
                              className="transition-transform  object-cover object-center duration-700 transform group-hover:scale-[1.2]"
                              src={
                                "data:image/jpeg;base64," + bookData.imageURL
                              }
                              alt="book-img"
                            />
                            {/* </div> */}
                          </CardContent>
                          <CardFooter className="flex flex-col p-2">
                            <CardTitle className="text-md flex flex-row w-full justify-between align-top">
                              <p className=" text-gray-500">{bookData.title}</p>
                              <p className="text-gray-700 lg:hidden">
                                ${bookData.cost}
                              </p>
                            </CardTitle>

                            <div className="hidden lg:block w-full border-b-2 pt-2 border-gray-200"></div>
                            <CardDescription className="p-0 pt-2 m-0 w-full flex flex-row justify-between">
                              <div>
                                <p>fantasy, horror</p>

                                <p className="hidden pt-2 text-gray-700 lg:inline-block font-semibold">
                                  ${bookData.cost}
                                </p>
                              </div>
                              <p className=" font-medium">
                                {bookData.language}
                              </p>
                            </CardDescription>
                          </CardFooter>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))
                )}
              </CarouselContent>
              <div className="hidden lg:block m-0 p-0">
                <CarouselPrevious className="ml-[4rem]  bg-violet-900 text-white" />
                <CarouselNext className="mr-[4rem] bg-violet-900 text-white" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default BookInfoBase;
