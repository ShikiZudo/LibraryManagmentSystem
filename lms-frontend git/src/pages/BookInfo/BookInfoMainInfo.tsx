import { useQuery } from "@tanstack/react-query";
import BookServices from "@/services/BookServices";
import { useAuthorization } from "@/context/AuthorizationProvider";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/Loading";
import { ErrorPage } from "@/components/ErrorPage";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
interface BookInfoMainInfoProps {
  bookdata: {
    authorName: string;
    bookCount: number;
    cost: number;
    description: string;
    edition: string;
    id: number;
    imageURL: string;
    isbn: string;
    language: string;
    pages: number;
    publisherName: string;
    title: string;
  };
}
const BookInfoMainInfo = ({ bookdata }: BookInfoMainInfoProps) => {
  const { toast } = useToast();
  const bookId = bookdata.id;
  const auth = useAuthorization();

  const { data: loanCountData } = useQuery({
    queryKey: ["loanCount", bookId],
    queryFn: () => BookServices.getLoanCount(bookId),
  });
  // Get reservation count for book
  const { data: reservationCountData } = useQuery({
    queryKey: ["reservationCount", 3],
    queryFn: () => BookServices.getReservationCount(bookId),
  });

  //get category/genre for book
  const { data, status } = useQuery({
    queryKey: ["bookcategory", bookId],
    queryFn: () => BookServices.getCategoryByBookId(bookId),
  });
  const availableBooks = bookdata.bookCount - loanCountData!;

  if (status === "pending")
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Loading />
      </div>
    );
  if (status === "error") return <ErrorPage />;

  console.log("category log: ", data);
  //get user book limit
  const bookLimit: number = auth.getAuthData?.noOfBooksLoan ?? 0;
  const buttonText = availableBooks! > 0 ? "Borrow" : "Reserve";

  const handleClick = async () => {
    if (availableBooks > 0) {
      await BookServices.loanBook(auth.getAuthData.id, bookId).then(() =>
        console.log("book loaned")
      );
    } else {
      await BookServices.reserveBook(auth.getAuthData.id, bookId).then(() =>
        console.log("book reserved")
      );
    }
    toast({
      title: "Book Rented!.",
      description: `Your have Successfully rented ${bookdata.title} .`,
      action: <ToastAction altText="OK">OK</ToastAction>,
    });
  };

  return (
    <div className="mt-4 p-5 flex flex-col h-[90%] w-full">
      <div className="ml-4 flex flex-col">
        <p className=" font-bold text-4xl text-violet-950">{bookdata.title}</p>
        <p className="text-gray-400 text-lg mt-4">
          {/* category display */}
          {data.map((ele) => (
            <p>{ele}</p>
          ))}
        </p>
      </div>
      <div className="border-b-2 mt-4 border-violet-200 w-full"></div>
      <div className="">
        <div className="flex flex-row justify-between">
          <p className="font-bold ml-4 pt-6 text-3xl text-gray-600">
            $ {bookdata.cost}
          </p>

          {bookLimit === 5 ? (
            <p className="text-red-600">
              User borrow limit of 5 books is reached. Please return a book to
              borrow this.
            </p>
          ) : null}
        </div>
        <div className="">
          <div className="ml-4 ">
            <p className="text-2xl mt-6 text-gray-600 font-bold underline underline-offset-4">
              Description
            </p>
            <p className="pl-1 mt-2 text-lg text-gray-500 font-semibold">
              {bookdata.description}
            </p>
          </div>
          <div className="border-8 rounded-lg bg-violet-50 border-violet-100 p-4 mt-8">
            <div className="flex flex-col my-2 justify-start align-middle ">
              <p className="text-lg text-gray-600 font-bold">Language:</p>
              <p className="text-gray-500 text-md font-semibold">
                {bookdata.language}
              </p>
            </div>
            <div className="flex flex-col my-3 justify-start align-middle ">
              <p className="text-lg text-gray-600 font-bold">Author Name:</p>
              <p className="text-gray-500 text-md font-semibold">
                {bookdata.authorName}
              </p>
            </div>
            <div className="flex flex-col my-3 justify-start align-middle ">
              <p className="text-lg text-gray-600 font-bold">Edition:</p>
              <p className=" text-gray-500 text-md font-semibold">
                {bookdata.edition}
              </p>
            </div>
            <div className="flex flex-col my-3 justify-start align-middle ">
              <p className="text-lg text-gray-600 font-bold">Publisher:</p>
              <p className=" text-gray-500 text-md font-semibold">
                {bookdata.publisherName}
              </p>
            </div>
            <div className="flex flex-col my-3 justify-start align-middle ">
              <p className="text-lg text-gray-600 font-bold">ISBN:</p>
              <p className=" text-gray-500 text-md font-semibold">
                {bookdata.isbn}
              </p>
            </div>
            <div className="flex flex-col my-3 justify-start align-middle ">
              <p className="text-lg text-gray-600 font-bold">
                {availableBooks! > 0 ? "Availability:" : "Reservation:"}
              </p>
              <p className=" text-gray-500 text-md font-semibold">
                {availableBooks! > 0 ? availableBooks : reservationCountData}
              </p>
            </div>
          </div>
          <Button
            className="bg-violet-950 w-full mt-10 h-16 hover:bg-violet-900"
            disabled={bookLimit === 5}
            onClick={handleClick}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookInfoMainInfo;
