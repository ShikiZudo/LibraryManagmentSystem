"use client";

import AuthenticationService from "@/services/AuthenticationService";
import BookServices from "@/services/BookServices";
import { ArrowRight, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MobileNav = ({ isAuth }: { isAuth: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const pathname = location.pathname;

  useEffect(() => {
    if (isOpen) toggleOpen();
  }, [pathname]);

  const closeOnCurrent = (href: string) => {
    if (pathname === href) toggleOpen();
  };

  const haldleLogout = () => {
    AuthenticationService.logout();
    window.location.reload();
  };

  return (
    <div className="sm:hidden">
      <Menu onClick={toggleOpen} className="relative z-50 h-5 w-5 text-black" />

      {isOpen ? (
        <div className="fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0 w-full">
          <ul className="absolute bg-white border-b border-zinc-200 shadaw-xl grid w-full gap-3 pt-20 px-20 pb-8">
            {!isAuth ? (
              <>
                <li>
                  <Link
                    onClick={() => closeOnCurrent("/login")}
                    className="flex items-center w-full font-semibold text-green-600"
                    to="/login"
                  >
                    Get started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-gray-300" />
                <li>
                  <Link
                    onClick={() => closeOnCurrent("/booklist")}
                    className="flex items-center w-full font-semibold"
                    to="/booklist"
                  >
                    Book List
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-gray-300" />
              </>
            ) : (
              <>
                <li className="">
                  <Link
                    className="flex items-center w-full font-semibold "
                    to="/profile#notification"
                  >
                    Notification
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-gray-300" />
                <li>
                  <Link
                    onClick={() => closeOnCurrent("/dashboard")}
                    className="flex items-center w-full font-semibold"
                    to="/booklist"
                  >
                    BookList
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-gray-300" />
                <li>
                  <Link
                    className="flex items-center w-full font-semibold"
                    to="/"
                    onClick={haldleLogout}
                  >
                    Log out
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default MobileNav;
