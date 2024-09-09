// @ts-nocheck
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useFetchReklama } from "../components/hooks/useFetch";

function Reklama() {
  const { data: reklamaData } = useFetchReklama();

  return (
    <div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 10000,
          }),
        ]}
      >
        <CarouselContent>
          {reklamaData &&
            reklamaData?.map((reklama) => {
              let today = new Date()
                .toISOString(reklama.startsAt)
                .slice(0, 19)
                .replace("T", " ");
              let startsAt = new Date()
                .toISOString(reklama.startsAt)
                .slice(0, 19)
                .replace("T", " ");
              let endsAt = new Date()
                .toISOString(reklama.endsAt)
                .slice(0, 19)
                .replace("T", " ");

              if (reklama.isPublished && startsAt <= today && today <= endsAt) {
                return (
                  <CarouselItem key={reklama.id}>
                    <a
                      href={reklama.targetUrl}
                      target="_blank"
                      className="flex flex-col items-center"
                    >
                      <div className="flex flex-col items-center w-full h-[500px] cursor-pointer p-1">
                        <img
                          src={reklama.imgUrl}
                          alt={reklama.title}
                          className="w-full h-2/3 object-contain"
                        />
                        <div className="w-1/3 bg-red-500 hover:bg-red-400 px-1 py-3 font-bold text-center text-gray-100 text-xs uppercase transition hover:scale-110">
                          {reklama.buttonMessage?.length > 1
                            ? reklama.buttonMessage
                            : "Shop Now!"}
                        </div>
                      </div>
                    </a>
                  </CarouselItem>
                );
              }
            })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default Reklama;
