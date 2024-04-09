import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Icons } from "./Icons";
import { Gem } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationService from "@/services/AuthenticationService";
import { cn } from "@/lib/utils";

interface UserAccountNavProps {
  email: string | undefined;
  name: string;
  imageUrl: string;
  role: string;
}

const UserAccountNav = ({
  email,
  imageUrl,
  name,
  role,
}: UserAccountNavProps) => {
  const navigate = useNavigate();
  // console.log(auth);

  const logout = async () => {
    AuthenticationService.logout();
    navigate("/");
    window.location.reload();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow;-visible">
        <Button className="rounded-full h-8 w-8 aspect-square bg-slate-400">
          <div className="relative ">
            {imageUrl.length > 0 ? (
              <div className="relative aspect-square h-full w-full">
                <img
                  src={imageUrl}
                  alt="profile picture"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div>
                <span className="sr-only">{name}</span>
                <Icons.user className="h-4 w-4 " />
              </div>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            {name && <p className="font-medium text-sm text-black"> {name}</p>}
            {email && (
              <p className="w-full truncate text-xs text-zinc-700 text-wrap">
                {email}
              </p>
            )}
          </div>
        </div>
        {role !== "ADMIN" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              asChild
              className="bg-purple-50 focus:bg-purple-100"
            >
              <Link to="/profile#notification">Notification</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem asChild>
          <Link to="/booklist">BookList</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to="/profile">
            Profile <Gem className="text-blue-600 h-4 w-4 ml-1.5" />
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" onClick={logout}>
          <Link to={"/"}>Log out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
