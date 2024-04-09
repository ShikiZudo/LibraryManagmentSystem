import { cn } from "@/lib/utils";
import { ReactNode } from "react";

function MaxWidthWrapper({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-screen-xl md:px-15 ", className)}>
      {children}
    </div>
  );
}

export default MaxWidthWrapper;
