import { Bookmark } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Doctor, Review } from "@/types";

export default function POverallStats({
  doctor,
  reviews,
}: {
  doctor: Doctor;
  reviews: Review[];
}) {
  console.log(reviews);
  return (
    <Card className="bg-[#d9e8ff9c] mx-auto ">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-6xl font-black text-gray-900 mb-1">
              {doctor.averageRating}
              <span className="text-lg font-bold text-gray-500 ml-1">/ 5</span>
            </div>
            <div className="text-sm text-gray-600">
              Overall Quality Based on{" "}
              <span className="underline cursor-pointer hover:text-blue-600">
                {reviews.length} ratings
              </span>
            </div>
          </div>
          <Bookmark className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
        </div>

        <div className="mt-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            {doctor.firstName} {doctor.lastName}
          </h2>
          <p className="text-gray-600 text-sm">
            Specializes in:{" "}
            {doctor.specialties.map((sp, index) => (
              <span
                key={index}
                className="underline cursor-pointer font-bold hover:text-blue-600"
              >
                {sp}{" "}
              </span>
            ))}
            at{" "}
            {doctor.clinics.map((clinic, index) => (
              <span
                key={index}
                className="underline cursor-pointer font-bold hover:text-blue-600"
              >
                {clinic.name}{" "}
              </span>
            ))}
          </p>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex justify-between items-start mb-6">
          <div className="text-left">
            <div className="text-4xl font-bold text-black mb-2">60%</div>
            <div className="text-sm text-gray-700 font-medium">
              Would take again
            </div>
          </div>

          <div className="text-left">
            <div className="text-4xl font-bold text-black mb-2">2.8</div>
            <div className="text-sm text-gray-700 font-medium">
              Level of Difficulty
            </div>
          </div>
        </div>

        <div className="justify-between flex gap-4">
          <Button className="flex-1 w-1/3 bg-blue-600 hover:bg-blue-700 text-white rounded-full py-6">
            Rate
            {/* <ArrowRight className="w-4 h-4 ml-2" /> */}
          </Button>

          <Button
            variant="outline"
            className="flex-1 border-2 w-1/3 border-gray-300 hover:bg-gray-50 text-gray-700 rounded-full py-6"
          >
            Compare
          </Button>
        </div>

        <div className="mt-4"></div>
      </CardContent>
    </Card>
  );
}
