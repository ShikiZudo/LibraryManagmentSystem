import { useAuthorization } from "@/context/AuthorizationProvider";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import UserServices from "@/services/UserServices";
import { useNavigate } from "react-router-dom";
import { Loading } from "@/components/Loading";
import { ErrorPage } from "@/components/ErrorPage";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const BorrowHistory = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const auth = useAuthorization();
  const userID: number | undefined = auth.getAuthData
    ? auth.getAuthData.id!
    : 1;

  const {
    data: ReservationHistorydata,
    status: ReservationHistorystatus,
    error: ReservationHistoryerror,
  } = useQuery({
    queryKey: ["user", "userreservationhistory", userID],
    queryFn: () => UserServices.getReservationHistory(userID),
  });

  const {
    data: FineHistorydata,
    status: FineHistorystatus,
    error: FineHistoryerror,
  } = useQuery({
    queryKey: ["user", "userFineHistory", userID],
    queryFn: () => UserServices.getUserFine(userID),
  });

  const onSubmit = (loanId: number, amount: number) => {
    UserServices.submitBook(loanId, amount).then((res) => {
      queryClient.invalidateQueries({
        queryKey: ["user", "userFineHistory", userID],
      });
      toast({
        title: "Book Submited!.",
        description: `Your Book have beensubmited successfully.
        submitted amount: ${res.submittedAmount}
        Return amount: ${res.returnAmount}`,
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
    });
  };

  if (FineHistorystatus === "pending") {
    return (
      <div className="flex justify-center items-center h-full w-screen">
        <Loading />
      </div>
    );
  }
  if (FineHistorystatus === "error") {
    console.log(FineHistoryerror);
    return <ErrorPage />;
  }

  if (ReservationHistorystatus === "pending") {
    return (
      <div className="flex justify-center items-center h-full w-screen">
        <Loading />
      </div>
    );
  }
  if (ReservationHistorystatus === "error") {
    console.log(ReservationHistoryerror);
    return <ErrorPage />;
  }

  if (!userID) return <div></div>;
  console.log(ReservationHistorydata);
  console.log(FineHistorydata);

  return (
    <div className="h-full overflow-y-auto scroll-smooth pt-10">
      <div className="flex flex-col justify-center items-center pb-14">
        <h2 className=" font-bold text-4xl pb-8 text-gray-600 w-full">
          Reservation History
        </h2>
        <table className="table-auto  w-full">
          <thead>
            <tr className="text-xl text-gray-600 h-10 bg-violet-100 ">
              <th>Book Image</th>
              <th>Book</th>
              <th>Reserve Date</th>
            </tr>
          </thead>
          <tbody className="">
            {ReservationHistorydata.map((item, index) => (
              <tr key={index} className=" hover:bg-violet-50">
                <td className="py-2">
                  <img
                    src={"data:image/jpeg;base64," + item.imgUrl}
                    alt="bookImage"
                    className="h-20 w-20 object-cover rounded-lg hover:cursor-pointer"
                    onClick={() => navigate(`/bookinfo/${item.bookId}`)}
                  />
                </td>
                <td>{item.bookName}</td>
                <td>{item.formattedIssueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h2 className=" font-bold text-4xl pb-8 text-gray-600 w-full">
          Rent History
        </h2>
        <table className="table-auto  w-full text-md">
          <thead>
            <tr className="text-xl text-gray-600 h-10 bg-violet-100">
              <th>Book img</th>
              <th>Book</th>
              <th>Status</th>
              <th>Issue Date</th>
              <th>Fine</th>
              <th>Submit</th>
            </tr>
          </thead>
          <tbody className="">
            {FineHistorydata.map((item, index) => (
              <tr key={index} className=" hover:bg-violet-50">
                <td className="py-2">
                  <img
                    src={"data:image/jpeg;base64," + item.imageUrl}
                    alt="bookImage"
                    className="h-20 w-20 object-cover rounded-lg hover:cursor-pointer"
                    onClick={() => navigate(`/bookinfo/${item.bookId}`)}
                  />
                </td>
                <td>{item.book}</td>
                <td>{item.status}</td>
                <td>{item.formattedIssueDate}</td>
                <td>{item.fineAmount}</td>
                <td>
                  {item.formattedReturnDate ? (
                    <div className="font-semibold">
                      <p>Returned on:</p>
                      {item.formattedReturnDate}
                    </div>
                  ) : (
                    <Button
                      className="bg-violet-950 hover:bg-violet-800"
                      onClick={() => {
                        onSubmit(item.id, item.fineAmount);
                      }}
                    >
                      Submit
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BorrowHistory;
