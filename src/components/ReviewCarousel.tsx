import * as React from "react";
import { Review, Doctor } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import ReviewCard from "./ReviewCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function ReviewCarousel({
  reviewList,
  doctor,
}: {
  reviewList: Review[];
  doctor: Doctor;
}) {
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      orientation="horizontal"
      className="w-full max-w-4xl items-center flex-shrink-0"
    >
      <CarouselContent className=" h-[370px] flex-shrink-0">
        {reviewList.map((review, index) => (
          <CarouselItem key={index} className="pt-1 ">
            <ReviewCard
              doctor={doctor.firstName + " " + doctor.lastName || "Doctor"}
              key={index}
              review={review}
              clinicsEmployed={doctor.clinics || "Clinic"}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
