import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import BookServices, { bookResponse } from "@/services/BookServices";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminServices, { bookUpdateRequest } from "@/services/AdminServices";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthorization } from "@/context/AuthorizationProvider";
import { cn } from "@/lib/utils";
type BookCardProps = {
  bookData: bookResponse;
};
export function BookCard({ bookData }: BookCardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const auth = useAuthorization().getAuthData;
  const [open, setOpen] = useState<boolean>(false);
  const [book, setBook] = useState<bookUpdateRequest>({
    title: bookData.title,
    isbn: bookData.isbn,
    authorName: bookData.authorName,
    publisherName: bookData.publisherName,
    edition: bookData.edition,
    description: bookData.description,
    language: bookData.language,
    pages: bookData.pages,
    cost: bookData.cost,
    bookCount: bookData.bookCount,
    link: bookData.link,
  });
  const [category, setCategory] = useState<string[]>([""]);
  useEffect(() => {
    const getCategories = async () => {
      const res = await BookServices.getCategoryByBookId(bookData.id);
      setCategory(res);
    };
    getCategories();
  }, []);
  const handleSubmit = () => {
    navigate(`/bookinfo/${bookData.id}`);
  };
  const handleDelete = () => {
    AdminServices.deleteBook(bookData.id).then((res) => {
      // console.log(res);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setOpen(false);
      toast({
        title: "Book Deleted!.",
        description: "Your Book have been Deleted from server.",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
    });
  };
  const handleEdit = () => {
    // console.log(book);
    AdminServices.updateBook(book, bookData.id).then((res) => {
      // console.log(res);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setOpen(false);
      toast({
        title: "Book Updated!.",
        description: "Yay! Your Book have been updated.",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
    });
  };
  return (
    <Card
      onClick={handleSubmit}
      className="flex flex-col h-[30rem] w-[15rem] justify-between border-0 mb-6 mx-1"
    >
      <CardContent className="w-full p-0 m-0  transition-all ease-in-out overflow-hidden group rounded-lg">
        <img
          className="transition-transform duration-700 transform group-hover:scale-[1.2]"
          src={"data:image/jpeg;base64," + bookData.imageURL}
          alt="book-img"
        />
      </CardContent>

      <CardFooter className="flex flex-col p-2">
        <CardTitle className="text-md flex flex-row w-full justify-between align-top">
          <p className=" text-gray-500">{bookData.title}</p>
          <p className="text-gray-700 lg:hidden">${bookData.cost}</p>
        </CardTitle>

        <div className="hidden lg:block w-full border-b-2 pt-2 border-gray-200"></div>

        <CardDescription className="p-0 pt-2 m-0 w-full flex flex-row justify-between">
          <div>
            <div className="flex flex-row">
              {category.map((cat, index) => (
                <p
                  key={index}
                  className="text-xs bg-gray-200 rounded-lg px-1 py-1 w-fit ml-1"
                >
                  {cat}
                </p>
              ))}
            </div>
            <p className="hidden pt-2 text-gray-700 lg:inline-block font-semibold">
              ${bookData.cost}
            </p>
          </div>
          <p className=" font-medium">{bookData.language}</p>
        </CardDescription>
        <CardHeader
          className={cn("h-8 p-0 m-0 w-full", {
            "hidden m-0": auth?.role !== "ADMIN",
          })}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between  w-full">
            {/* ------------ edit ----------------- */}
            <Dialog open={open}>
              <DialogTrigger asChild onClick={() => setOpen(true)}>
                <Button variant="outline" className="h-8">
                  Edit Book
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[50rem]"
                onPointerDownOutside={() => setOpen(false)}
              >
                <DialogHeader>
                  <DialogTitle>Edit Book</DialogTitle>
                  <DialogDescription>
                    Make changes to your book here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="grid grid-row-2  items-center gap-4">
                    <Label htmlFor="title" className="text-left">
                      title
                    </Label>
                    <Input
                      id="title"
                      defaultValue={book.title}
                      onChange={(e) =>
                        setBook({ ...book, title: e.target.value })
                      }
                      className=""
                    />
                  </div>
                  <div className="grid grid-row-2  items-center gap-4">
                    <Label htmlFor="isbn" className="text-left">
                      isbn
                    </Label>
                    <Input
                      id="isbn"
                      defaultValue={book.isbn}
                      onChange={(e) =>
                        setBook({ ...book, isbn: e.target.value })
                      }
                      className=""
                    />
                  </div>
                  <div className="grid grid-row-2  items-center gap-4">
                    <Label htmlFor="authorName" className="text-left">
                      authorName
                    </Label>
                    <Input
                      id="authorName"
                      defaultValue={book.authorName}
                      onChange={(e) =>
                        setBook({ ...book, authorName: e.target.value })
                      }
                      className=""
                    />
                  </div>
                  <div className="grid grid-row-2  items-center gap-4">
                    <Label htmlFor="publisherName" className="text-left">
                      publisherName
                    </Label>
                    <Input
                      id="publisherName"
                      defaultValue={book.publisherName}
                      onChange={(e) =>
                        setBook({ ...book, publisherName: e.target.value })
                      }
                      className=""
                    />
                  </div>
                  <div className="grid grid-row-2  items-center gap-4">
                    <Label htmlFor="edition" className="text-left">
                      edition
                    </Label>
                    <Input
                      id="edition"
                      defaultValue={book.edition}
                      onChange={(e) =>
                        setBook({ ...book, edition: e.target.value })
                      }
                      className=""
                    />
                  </div>
                  <div className="grid grid-row-2  items-center gap-4">
                    <Label htmlFor="description" className="text-left">
                      description
                    </Label>
                    <Input
                      id="description"
                      defaultValue={book.description}
                      onChange={(e) =>
                        setBook({ ...book, description: e.target.value })
                      }
                      className=""
                    />
                  </div>
                  <div className="grid grid-row-2  items-center gap-4">
                    <Label htmlFor="language" className="text-left">
                      language
                    </Label>
                    <Input
                      id="language"
                      defaultValue={book.language}
                      onChange={(e) =>
                        setBook({ ...book, language: e.target.value })
                      }
                      className=""
                    />
                  </div>
                  <div className="grid grid-row-2  items-center gap-4">
                    <Label htmlFor="pages" className="text-left">
                      pages
                    </Label>
                    <Input
                      id="pages"
                      defaultValue={book.pages}
                      onChange={(e) =>
                        setBook({ ...book, pages: parseInt(e.target.value) })
                      }
                      className=""
                    />
                  </div>
                  <div className="grid grid-row-2  items-center gap-4">
                    <Label htmlFor="cost" className="text-left">
                      cost
                    </Label>
                    <Input
                      id="cost"
                      defaultValue={book.cost}
                      onChange={(e) =>
                        setBook({ ...book, cost: parseInt(e.target.value) })
                      }
                      className=""
                    />
                  </div>
                  <div className="grid grid-row-2  items-center gap-4">
                    <Label htmlFor="bookCount" className="text-left">
                      bookCount
                    </Label>
                    <Input
                      id="bookCount"
                      defaultValue={book.bookCount}
                      onChange={(e) =>
                        setBook({
                          ...book,
                          bookCount: parseInt(e.target.value),
                        })
                      }
                      className=""
                    />
                  </div>
                  <div className="grid grid-row-2  items-center gap-4">
                    <Label htmlFor="link" className="text-left">
                      link
                    </Label>
                    <Input
                      id="link"
                      defaultValue={book.link}
                      onChange={(e) =>
                        setBook({ ...book, link: e.target.value })
                      }
                      className=""
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleEdit}>
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* ------------ delete --------------- */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="h-8 bg-violet-200">
                  DELETE
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your book and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
      </CardFooter>
    </Card>
  );
}
