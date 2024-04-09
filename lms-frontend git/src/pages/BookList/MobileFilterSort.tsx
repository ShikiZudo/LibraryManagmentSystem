import { useState } from "react";
import { MobileFilterBox } from "./MobileFilterBox";
import { Button } from "@/components/ui/button";
import { filterOptions, sortOptions } from "@/lib/enums";

import { ArrowUpWideNarrow, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

type MobileFilterSortProps = {
  filter: {
    type: filterOptions;
    filterElement: string[];
  }[];
  setFilter: React.Dispatch<
    React.SetStateAction<
      {
        type: filterOptions;
        filterElement: string[];
      }[]
    >
  >;
  selected: {
    type: filterOptions;
    state: boolean[];
  }[];
  setSelected: React.Dispatch<
    React.SetStateAction<
      {
        type: filterOptions;
        state: boolean[];
      }[]
    >
  >;
  setSort: React.Dispatch<React.SetStateAction<sortOptions>>;
  sort: sortOptions;
};

export const MobileFilterSort = ({
  filter,
  setFilter,
  selected,
  setSelected,
  setSort,
  sort,
}: MobileFilterSortProps) => {
  const [openSort, setOpenSort] = useState<boolean>(false);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [mobileFilter, setMobileFilter] = useState<filterOptions>(
    filterOptions.AUTHOR
  );

  const handleSort = (selected: sortOptions) => {
    console.log(selected);
    setSort(selected);
    setOpenSort(false);
  };
  return (
    <>
      {openSort && (
        <div className="fixed animate-in slide-in-from-bottom-5 fade-in-20 inset-0 z-0 w-full ">
          <ul className="absolute bottom-0 bg-white border-t  border-b border-zinc-200 shadaw-xl grid w-full gap-1 pb-20 px-20 pt-8">
            <li>
              <Button
                variant={"link"}
                className={cn(
                  "flex items-center w-full font-semibold  text-lg",
                  {
                    " bg-zinc-200": sort === sortOptions.POPULARITY,
                    " hidden": sortOptions.POPULARITY === sort,
                  }
                )}
                onClick={() => handleSort(sortOptions.POPULARITY)}
              >
                {sortOptions.POPULARITY}
              </Button>
            </li>
            <li className="my-1 h-px w-full bg-gray-300" />
            <li>
              <Button
                variant={"link"}
                className={cn(
                  "flex items-center w-full font-semibold  text-lg",
                  { " bg-zinc-200": sort === sortOptions.NEWEST }
                )}
                onClick={() => handleSort(sortOptions.NEWEST)}
              >
                {sortOptions.NEWEST}
              </Button>
            </li>
            <li className="my-1 h-px w-full bg-gray-300" />
            <li>
              <Button
                variant={"link"}
                className={cn(
                  "flex items-center w-full font-semibold  text-lg",
                  { " bg-zinc-200": sort === sortOptions.ALPHABETICAL }
                )}
                onClick={() => handleSort(sortOptions.ALPHABETICAL)}
              >
                {sortOptions.ALPHABETICAL}
              </Button>
            </li>
            <li className="my-1 h-px w-full bg-gray-300" />
            <li>
              <Button
                variant={"link"}
                className={cn(
                  "flex items-center w-full font-semibold  text-lg",
                  { " bg-zinc-200": sort === sortOptions.PRICE }
                )}
                onClick={() => handleSort(sortOptions.PRICE)}
              >
                {sortOptions.PRICE}
              </Button>
            </li>
          </ul>
        </div>
      )}
      {openFilter && (
        <div className=" flex flex-row fixed bg-white animate-in slide-in-from-bottom-5 fade-in-20 inset-0 z-0 w-full">
          <div className=" w-[35%] bg-slate-200 border-none">
            <ul className=" shadaw-xl flex flex-col justify-center items-center w-full gap-1 pt-20">
              {filter.map((ele) => (
                <>
                  <li className="w-full m-0 p-0">
                    <Button
                      variant={"link"}
                      className={cn(
                        "flex items-center w-full font-semibold text-lg focus:no-underline focus:bg-white rounded-none h-14",
                        {
                          " bg-white": mobileFilter === ele.type,
                        }
                      )}
                      onClick={() => setMobileFilter(ele.type)}
                    >
                      {ele.type}
                    </Button>
                  </li>
                </>
              ))}
            </ul>
          </div>
          <div className="w-[63%] border-none">
            <div className="h-full pt-20">
              {mobileFilter === filterOptions.AUTHOR ? (
                <MobileFilterBox
                  filter={filter}
                  // setFilter={setFilter}
                  filterName={filterOptions.AUTHOR}
                  selected={selected}
                  setSelected={setSelected}
                />
              ) : mobileFilter === filterOptions.CATEGORY ? (
                <MobileFilterBox
                  filter={filter}
                  // setFilter={setFilter}
                  filterName={filterOptions.CATEGORY}
                  selected={selected}
                  setSelected={setSelected}
                />
              ) : mobileFilter === filterOptions.LANGUAGE ? (
                <MobileFilterBox
                  filter={filter}
                  // setFilter={setFilter}
                  filterName={filterOptions.LANGUAGE}
                  selected={selected}
                  setSelected={setSelected}
                />
              ) : (
                <div> NO filter Selected</div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="lg:hidden h-16 w-full bg-white sticky bottom-0 flex flex-row justify-between items-center border-solid border-t-2 text-slate-400">
        <Button
          className="bg-transparent text-black w-[50%] h-full hover:bg-white rounded-none"
          onClick={() => {
            setOpenFilter((old) => !old);
            setOpenSort(false);
          }}
        >
          <Filter />
          filter
        </Button>
        <div className="p-0 m-0 text-[3rem]  text-center  text-slate-400">
          |
        </div>
        <Button
          className="bg-transparent text-black w-[50%] h-full hover:bg-white rounded-none"
          onClick={() => {
            setOpenSort((old) => !old);
            setOpenFilter(false);
          }}
        >
          <ArrowUpWideNarrow />
          sort
        </Button>
      </div>
    </>
  );
};
