import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function Hero() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const images = [
    "/c1.png",
    "/c2.png",
    "/c3.png",
    "/c4.png",
    "/c5.png",
    "/c6.png",
    "/c7.png",
  ];

  return (
    <div className="top-0 w-[98vw] lg:px-[2%] rounded-lg flex justify-center">
      <Carousel
        plugins={[plugin.current]}
        className="rounded-lg "
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.play}
      >
        <CarouselContent>
          {images.map((ele, index) => (
            <CarouselItem
              key={index}
              className="flex justify-center items-center"
            >
              <div className="p-1 w-full">
                <Card className="flex justify-center items-center bg-violet-100 pb-4 ">
                  <CardContent className="flex items-center lg:w-[94%] h-[50vh] justify-center md:h-[38rem] lg:h-[46rem] overflow-hidden ">
                    <img
                      src={ele}
                      alt=""
                      className="p-0 m-0 w-full h-full rounded-lg object-cover object-center"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
