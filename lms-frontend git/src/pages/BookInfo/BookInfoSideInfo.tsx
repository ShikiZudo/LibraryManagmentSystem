import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import BookServices from "@/services/BookServices";
import { useAuthorization } from "@/context/AuthorizationProvider";
import { Loading } from "@/components/Loading";
import { ErrorPage } from "@/components/ErrorPage";
interface Props {
  cost: number;
  bookId: number;
  bookCount: number;
}
const BookInfoSideInfo = ({ cost, bookId, bookCount }: Props) => {
  //getting user context
  const auth = useAuthorization();
  console.log(auth.getAuthData?.id);

  //get user book limit
  const bookLimit: number = auth.getAuthData?.noOfBooksLoan ?? 0;
  // Get loan count for book
  const { data: loanCountData, status: loanCountStatus } = useQuery({
    queryKey: ["loanCount", bookId],
    queryFn: () => BookServices.getLoanCount(bookId),
  });

  // Get reservation count for book
  const { data: reservationCountData, status: reservationCountStatus } =
    useQuery({
      queryKey: ["reservationCount", bookId],
      queryFn: () => BookServices.getReservationCount(bookId),
    });

  //get user details from userid, get userbookloan count

  if (loanCountStatus === "pending")
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Loading />
      </div>
    );
  if (loanCountStatus === "error") return <ErrorPage />;

  console.log("loanCountData log: ", loanCountData);

  if (reservationCountStatus === "pending")
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Loading />
      </div>
    );
  if (reservationCountStatus === "error") return <ErrorPage />;
  console.log("reservationCountData log: ", reservationCountData);

  const availableBooks = bookCount - loanCountData;
  let buttonText = "Borrow";

  return (
    <>
      <div className="flex flex-col align-middle justify-center border-none rounded-xl border-4 px-16">
        <p className="font-bold">More Information</p>
        <p>Cost: {cost}</p>
        {availableBooks > 0 ? (
          <p>
            Availability: <span>{availableBooks}</span>
          </p>
        ) : (
          <>
            <p>
              Reservation: <span>{reservationCountData}</span>
            </p>
            {(buttonText = "Reserve")}
          </>
        )}
      </div>
      <div className="flex justify-center align-middle pt-2">
        <Button disabled={bookLimit === 5}>{buttonText}</Button>
        {bookLimit === 5 ? (
          <p className="text-red-600">
            User borrow limit of 5 books is reached. Please return a book to
            borrow this.
          </p>
        ) : null}
      </div>
    </>
  );
};

export default BookInfoSideInfo;
