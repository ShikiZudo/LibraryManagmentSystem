// import bookimage from "@/assets/bookimage.jpg";
interface Prop {
  imageUrl: string;
}
const BookInfoImg = ({ imageUrl }: Prop) => {
  // console.log(imageUrl);

  return (
    <div
      className="py-4  flex justify-center"
      // className="flex flex-col justify-center align-middle border-black rounded-lg "
    >
      {/* change the image src here after data change */}
      <img
        src={imageUrl}
        alt="Book Image"
        className="w-[90%] rounded-xl border-8 border-violet-100"
      />
    </div>
  );
};

export default BookInfoImg;
