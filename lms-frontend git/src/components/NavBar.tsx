import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";

import { ArrowRight } from "lucide-react";
import UserAccountNav from "./UserAccountNav";
import MobileNav from "./MobileNav";
import { Link } from "react-router-dom";
import { useAuthorization } from "@/context/AuthorizationProvider";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const user = useAuthorization().getAuthData;
  const notificationData = user ? user.notification : [];

  let unseen = false;
  if (notificationData !== undefined) {
    for (let i = 0; i < notificationData.length; i++) {
      const element = notificationData[i];
      if (element.seen === false) {
        unseen = true;
        break;
      }
    }
  }

  let color = "red";
  if (notificationData !== undefined) {
    for (let i = 0; i < notificationData.length; i++) {
      const element = notificationData[i];
      if (element.type === "ALERT") {
        color = "red";
        break;
      } else if (element.type === "INFO") {
        color = "blue";
      } else if (element.type === "REMINDER") {
        color = "orange";
      }
    }
  }

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/60 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link to="/" className="flex z-40 font-semibold">
            <span className="">
              <img src="/logo.png" className="h-[1.8rem]" alt="" />
            </span>
          </Link>
          <div className=" flex flex-col-reverse">
            <div className="z-0">
              <MobileNav isAuth={user ? true : false} />
            </div>
            <div className="w-full flex justify-end mb-[-10px] z-10">
              <div
                className={cn(
                  "h-3 w-3 rounded-full bg-red-700 animate-bounce sm:hidden",
                  {
                    "hidden ": !unseen,
                    "bg-red-700": color === "red",
                    "bg-blue-700": color === "blue",
                    "bg-yellow-700": color === "orange",
                  }
                )}
              ></div>
            </div>
          </div>

          <div className="hidden items-center space-x-4 sm:flex">
            {!user ? (
              <>
                <Link
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                  to="/booklist"
                >
                  Book List
                </Link>
                <Link
                  className={buttonVariants({
                    size: "sm",
                  })}
                  to="/login"
                >
                  Get started <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/booklist"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  BookList
                </Link>

                <div className=" flex flex-col-reverse">
                  <div className="z-0">
                    <UserAccountNav
                      name={
                        !user.firstName || !user.lastName
                          ? "Your Account"
                          : `${user.firstName} ${user.lastName}`
                      }
                      email={user.email ?? ""}
                      imageUrl={user.image ?? ""}
                      role={user.role}
                    />
                  </div>
                  <div
                    className={cn("w-full flex justify-end mb-[-10px] z-10", {
                      hidden: !unseen,
                    })}
                  >
                    <div
                      className={cn("h-3 w-3 rounded-full animate-bounce", {
                        "hidden ": !unseen,
                        "bg-red-700": color === "red",
                        "bg-blue-700": color === "blue",
                        "bg-yellow-700": color === "orange",
                      })}
                    ></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
