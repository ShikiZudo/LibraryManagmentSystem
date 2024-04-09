import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import AdminServices, { LateLoanResponse } from "@/services/AdminServices";
import { useEffect, useState } from "react";

const ReturnRequest = () => {
  const { toast } = useToast();
  const [notification, setNotification] = useState<"Late" | "Tommorow">("Late");
  const [loanData, setLoanData] = useState<LateLoanResponse>([]);
  const [warnCount, setWarnCount] = useState<number>(0);

  useEffect(() => {
    AdminServices.lateLoan().then((res) => {
      console.log(res);
      setLoanData(res);
    });
  }, []);

  return (
    <div className="w-full">
      <div className="h-full overflow-y-auto scroll-smooth pb-14 ">
        <div className="flex jc items-center h-20 text-4xl p-4 py-12">
          <p className="text-gray-500 font-bold">Send Notification</p>
        </div>
        <div className="w-full">
          <Button
            className={cn(
              "w-[48%] rounded-none bg-violet-950 hover:bg-violet-900 h-16 m-1",
              {
                "bg-violet-800": notification === "Late",
              }
            )}
            onClick={() => {
              AdminServices.lateLoan().then((res) => {
                console.log(res);
                setLoanData(res);
              });
              setNotification("Late");
            }}
          >
            Get Late Book Loan
          </Button>
          <Button
            className={cn(
              "w-[48%] rounded-none bg-violet-950 hover:bg-violet-900 h-16 m-1",
              {
                "bg-violet-800": notification === "Tommorow",
              }
            )}
            onClick={() => {
              AdminServices.getLoanWarnCount().then((res) => {
                console.log(res);
                setWarnCount(res);
              });
              // AdminServices.remindBookRequest().then((res) => {
              //   console.log(res);
              // });
              setNotification("Tommorow");
            }}
          >
            Book Loan ending Tommorow
          </Button>
        </div>
        {notification === "Late" && (
          <div>
            <p className="text-3xl text-gray-500 mt-8 px-4">
              Late User Count: {loanData.length}
            </p>
            <div className="mt-16 flex flex-col">
              <div className="flex flex-row mb-8 justify-between px-4 pr-8">
                <p className="font-bold text-gray-500">Book Name</p>

                <p className="font-bold text-gray-500">User Email</p>

                <p className="font-bold text-gray-500">Issue Date</p>

                <p className="font-bold text-gray-500">Status</p>
              </div>
              {loanData.map((loan) => {
                return (
                  <div className="flex flex-row mb-8 justify-between px-4 pr-8">
                    <p>{loan.book.title}</p>
                    <p>{loan.user.email}</p>
                    <p>{loan.issueDate}</p>
                    <p>{loan.status}</p>
                  </div>
                );
              })}
              <div className="flex justify-center items-center">
                <Button
                  className="w-1/2  bg-violet-950 hover:bg-violet-900 p-8 mt-8"
                  onClick={() => {
                    AdminServices.returnBookRequest().then((res) => {
                      console.log(res);
                      toast({
                        title: "Notification Sent!.",
                        description:
                          "Notifications have been Sent to all users.",
                        action: <ToastAction altText="OK">OK</ToastAction>,
                      });
                    });
                  }}
                >
                  Send Notification
                </Button>
              </div>
            </div>
          </div>
        )}
        {notification === "Tommorow" && (
          <div>
            <p className="text-3xl text-gray-500 mt-8 px-4">
              Late User Count: {warnCount}
            </p>
            <div className="mt-16 flex flex-col">
              <div className="flex justify-center items-center">
                <Button
                  className="w-1/2  bg-violet-950 hover:bg-violet-900 p-8 mt-8"
                  onClick={() => {
                    AdminServices.remindBookRequest().then((res) => {
                      console.log(res);
                      toast({
                        title: "Notification Sent!.",
                        description:
                          "Notifications have been Sent to all users.",
                        action: <ToastAction altText="OK">OK</ToastAction>,
                      });
                    });
                  }}
                >
                  Send Notification
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReturnRequest;
