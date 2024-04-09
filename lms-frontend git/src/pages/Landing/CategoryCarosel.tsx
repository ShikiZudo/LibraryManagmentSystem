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
import BookServices, { filterRequestDataType } from "@/services/BookServices";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function CategoryCarosel({
  ind,
  filterList,
  filterType,
}: {
  ind: number;
  filterList: filterRequestDataType;
  filterType: string;
}) {
  const { data, status, error } = useQuery({
    queryKey: ["books", filterList],
    queryFn: () => BookServices.getBooksByFilter(filterList),
  });
  const navigate = useNavigate();
  const handleSubmit = (id: number) => {
    navigate(`/bookinfo/${id}`);
  };
  if (status === "pending")
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Loading />
      </div>
    );
  if (status === "error") {
    console.log(error);

    return <ErrorPage />;
  }

  return (
    <div
      className={cn(
        "border flex flex-col items-center justify-center rounded-lg bg-violet-50 max-w-[85rem] ",
        {
          "lg:flex-row": ind % 2 !== 0,
          "lg:flex-row-reverse": ind % 2 === 0,
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
            "lg:-rotate-90": ind % 2 !== 0,
            "lg:rotate-90": ind % 2 === 0,
          })}
        >
          {filterType.toUpperCase()}
        </h1>
      </div>
      <Carousel
        className={cn(
          "w-[70%] lg:w-[90%] pl-4 max-w-screen-sm md:max-w-screen-md  lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl lg:rounded-lg",
          {
            "lg:pl-10": ind % 2 !== 0,
            "lg:pr-10": ind % 2 === 0,
          }
        )}
      >
        <CarouselContent className="w-full">
          {data.map((bookData, index) => (
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
                      src={"data:image/jpeg;base64," + bookData.imageURL}
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
                        {/* <p>fantsy, horror</p> */}
                        <p className="hidden pt-2 text-gray-700 lg:inline-block font-semibold">
                          ${bookData.cost}
                        </p>
                      </div>
                      <p className=" font-medium">{bookData.language}</p>
                    </CardDescription>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden lg:block m-0 p-0">
          <CarouselPrevious className="ml-[4rem]  bg-violet-900 text-white" />
          <CarouselNext className="mr-[4rem] bg-violet-900 text-white" />
        </div>
      </Carousel>
    </div>
  );
}
