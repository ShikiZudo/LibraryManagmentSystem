import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UpdateProfile from "./UpdateProfile";
import BorrowHistory from "./BorrowHistory";
import { useAuthorization } from "@/context/AuthorizationProvider";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthenticationService from "@/services/AuthenticationService";
import { cn } from "@/lib/utils";
import { ErrorPage } from "@/components/ErrorPage";
import { useLocation, useNavigate } from "react-router-dom";
import { Notification } from "./Notification";

const ProfileBase = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuthorization().getAuthData;

  return (
    <MaxWidthWrapper>
      <div className="flex flex-row min-h-[94vh] bg-white">
        <div className="h-[94vh] w-[25%] bg-violet-50 flex-col pt-8 pb-16 flex justify-between">
          <div>
            <div className="bg-violet-200 text-slate-600 flex flex-row">
              <div className="flex justify-center items-center p-4">
                <div className=" aspect-square rounded-full w-12 h-12 bg-white flex justify-center items-center">
                  {auth?.firstName[0]}
                </div>
              </div>
              <div className="flex flex-col h-28 justify-around py-3 ml-3">
                <p className=" font-bold">{`${auth?.firstName} ${auth?.lastName}`}</p>
                <p className="">{auth?.email}</p>
                <p className="flex flex-row font-semibold ml-[-4px]">
                  <User className="h-6" /> {auth?.role}
                </p>
              </div>
            </div>
            <div className="mt-16 bg-violet-50 border-y border-violet-200">
              <div
                className={cn(
                  "w-full h-20 hover:bg-violet-100 flex border-b border-violet-200 justify-center items-center hover:cursor-pointer",
                  {
                    "bg-violet-100": location.hash === "#update",
                  }
                )}
                onClick={() => navigate("#update")}
              >
                User Profile
              </div>
              <div
                className={cn(
                  "w-full h-20 hover:bg-violet-100 flex border-b border-violet-200 justify-center items-center hover:cursor-pointer",
                  {
                    "bg-violet-100": location.hash === "#notification",
                  }
                )}
                onClick={() => navigate("#notification")}
              >
                Notification
              </div>
              <div
                className={cn(
                  "w-full h-20 hover:bg-violet-100 flex border-b border-violet-200 justify-center items-center hover:cursor-pointer",
                  {
                    "bg-violet-100": location.hash === "#borrow",
                  }
                )}
                onClick={() => navigate("#borrow")}
              >
                Rent & Reservation
              </div>
            </div>
          </div>
          <Button
            className="mx-4 bg-violet-950 hover:bg-violet-800"
            onClick={() => {
              AuthenticationService.logout();
              navigate("/");
              window.location.reload();
            }}
          >
            Log out
          </Button>
        </div>
        <div className="max-h-[88vh] w-[75%] m-7 border-2 border-violet-200 rounded-lg border-l-0">
          {location.hash === "" && <UpdateProfile />}
          {location.hash === "#update" && <UpdateProfile />}
          {location.hash === "#borrow" && <BorrowHistory />}
          {location.hash === "#notification" && <Notification />}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProfileBase;
