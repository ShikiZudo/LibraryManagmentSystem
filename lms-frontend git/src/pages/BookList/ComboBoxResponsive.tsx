import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import BookServices, { bookResponse } from "@/services/BookServices";
import { Search, X } from "lucide-react";
import { SetStateAction, useState } from "react";
type ComboBoxResponsiveProps = {
  setName: React.Dispatch<SetStateAction<string | null | undefined>>;
  setList: React.Dispatch<SetStateAction<bookResponse[] | null>>;
};
export function ComboBoxResponsive({
  setName,
  setList,
}: ComboBoxResponsiveProps) {
  const { toast } = useToast();
  const [search, setSearch] = useState<string | null>();
  const [searchList, setSearchList] = useState<bookResponse[] | null>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSearch = (value: string) => {
    BookServices.searchBook(value).then((res) => {
      setSearchList(res);
      setSearch(value);
      console.log(res);
    });
  };

  const handleSubmit = () => {
    if (search !== null && searchList !== null) {
      setName(search);
      setList(searchList);
    } else {
      toast({
        title: "blank Field!.",
        description: "Type someThing to search",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
    }
  };

  const handleSelect = (value: string) => {
    BookServices.searchBook(value).then((res) => {
      setSearchList(res);
      setSearch(value);
      if (value !== null) {
        setName(value);
        setList(res);
      }
    });
  };
  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
          <Search />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[35rem] max-h-[60vh] bg-white border-2 border-gray-200 rounded-md shadow-md p-4 "
        side="left"
        align="start"
        onPointerDownOutside={() => setIsOpen(false)}
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="flex flex-col p-0 items-start gap-4">
              <div className="flex flex-row justify-between w-full mb-[-1.2rem]">
                <label htmlFor="width" className=" pl-4 font-semibold">
                  Search
                </label>
                <p
                  className="flex flex-row bg-violet-100 px-2 rounded-sm hover:cursor-pointer mr-2 text-sm"
                  onClick={() => {
                    setName(null);
                    setList(null);
                    setIsOpen(false);
                  }}
                >
                  clear
                  <X className="h-4 mx-auto my-auto" />
                </p>
              </div>
              <div className="flex flex-row justify-between p-0 m-0 w-full">
                <Input
                  id="width"
                  defaultValue=""
                  className="h-9 m-2"
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                />
                <Button
                  className="h-8 m-2 bg-violet-950 hover:bg-violet-800 "
                  onClick={handleSubmit}
                >
                  search
                </Button>
              </div>
            </div>
            <div className="max-h-[48vh] overflow-auto">
              {search && searchList ? (
                searchList.map((item, index) => (
                  <div
                    className="hover:cursor-pointer hover:bg-violet-50 p-2 rounded-sm flex flex-row"
                    key={index}
                    onClick={(e) => {
                      handleSelect(item.title);
                      setIsOpen(false);
                    }}
                  >
                    <img
                      src={"data:image/jpeg;base64," + item.imageURL}
                      className=" h-10 w-10 mr-2"
                      alt=""
                    />
                    {item.title}
                  </div>
                ))
              ) : (
                <div>enter value to search</div>
              )}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
