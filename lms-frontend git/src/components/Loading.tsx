export const Loading = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <img
        src="/logo.png"
        alt="Logo"
        width={240}
        height={240}
        className="animate-pulse duration-700"
      />
    </div>
  );
};
