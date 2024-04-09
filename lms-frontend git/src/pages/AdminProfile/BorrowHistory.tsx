import UserServices, {
  ReservationHistoryResponse,
  UserFineResponse,
} from "@/services/UserServices";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const BorrowHistory = () => {
  const navigate = useNavigate();
  const [userID, setUserID] = useState<number | null>(null);

  const [ReservationHistorydata, setReservationHistorydata] =
    useState<ReservationHistoryResponse>([]);
  const [FineHistorydata, setFineHistorydata] = useState<UserFineResponse>([]);

  const hanldeGetDetails = async () => {
    if (userID === null) return;
    UserServices.getReservationHistory(userID).then((res) => {
      setReservationHistorydata(res);
    });
    UserServices.getUserFine(userID).then((res) => {
      setFineHistorydata(res);
    });
  };

  return (
    <div className="h-full overflow-y-auto scroll-smooth pb-14 ">
      <div className="flex jc items-center h-20 text-4xl p-4 py-12">
        <p className="text-gray-500 font-bold">Rent & Reservation</p>
      </div>
      <div className=" bg-violet-50 rounded-lg h-36 flex flex-row justify-between items-center pr-8 mr-8">
        <div className="flex flex-row justify-start items-center">
          <Input
            type="text"
            placeholder="Enter user id ..."
            value={userID ? userID : ""}
            onChange={(e) => setUserID(parseInt(e.target.value))}
            className="flex w-1/2 h-10 m-4 text-xl"
          />
          <Button
            onClick={hanldeGetDetails}
            className="mx-4 bg-violet-950 hover:bg-violet-900"
          >
            Get Details
          </Button>
        </div>
        <Button
          variant={"link"}
          onClick={() => {
            setFineHistorydata([]);
            setReservationHistorydata([]);
          }}
          className="text-lg text-gray-500"
        >
          clear
        </Button>
      </div>
      {ReservationHistorydata.length > 0 && FineHistorydata.length > 0 && (
        <div>
          <div className="flex flex-col justify-center items-center pb-14">
            <h2 className=" font-bold text-4xl pb-10 text-gray-600 w-full">
              Reservation History
            </h2>
            <table className="table-auto  w-full">
              <thead>
                <tr className="text-xl text-gray-600 bg-violet-200 h-10">
                  <th>Book Image</th>
                  <th>Book</th>
                  <th>Reserve Date</th>
                </tr>
              </thead>
              <tbody className="">
                {ReservationHistorydata.map((item, index) => (
                  <tr key={index} className="hover:bg-violet-50">
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
            <h2 className=" font-bold text-4xl pb-10 text-gray-600 w-full">
              Rent History
            </h2>
            <table className="table-auto  w-full text-md">
              <thead>
                <tr className="text-xl text-gray-600 bg-violet-200 h-10">
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
                  <tr key={index} className="hover:bg-violet-50">
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
                        <p className="font-semibold">item not returned yet.</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BorrowHistory;
