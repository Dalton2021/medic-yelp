"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ReviewBundle, Doctor } from "@/types";
import { Bookmark } from "lucide-react";
import Link from "next/link";
export default function PCard({
  Ratings,
  Doctor,
}: {
  Ratings: ReviewBundle;
  Doctor: Doctor;
}) {
  return (
    <Link
      href={`/physician/${name}`}
      className="col-start-3 col-span-4 hover:no-underline"
    >
      <Card className=" mb-3  bg-neutral-100 border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            {/* Left side - Rating and stats */}
            <div className="flex items-start space-x-6">
              {/* Quality Rating */}
              <div className="flex flex-col items-center">
                <div className="text-xs font-medium text-gray-600 mb-1">
                  QUALITY
                </div>
                <div className="w-16 h-16 bg-emerald-400 rounded-lg flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {Doctor.averageRating}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">{} ratings</div>
              </div>

              {/* Professor Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {Doctor.firstName} {Doctor.lastName}
                </h2>
                {Doctor.specialties.map((specialty, index) => (
                  <div key={index} className="text-gray-600 mb-2">
                    {Doctor.specialties}
                  </div>
                ))}
                {Doctor.clinics.map((clinic, index) => (
                  <div key={index} className="text-gray-600 mb-4">
                    {clinic.name}
                  </div>
                ))}

                {/* Stats */}
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-900">
                    <span className="text-2xl font-bold">
                      {/* {wouldTakeAgain}% */}
                    </span>{" "}
                    Recommend
                  </span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-900">
                    <span className="text-2xl font-bold">
                      {Doctor.yearsOfExperience}
                    </span>{" "}
                    Years Practicing
                  </span>
                </div>
              </div>
            </div>

            {/* Right side - Bookmark */}
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <Bookmark size={24} />
            </button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
