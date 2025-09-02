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
  const ival = 0;
  const recommend: number = Ratings.ratings.reduce((approve, ratingScore) => {
    if (ratingScore > 2) {
      approve++;
    }
    return approve;
  }, ival);
  const rPercent = Math.round((recommend / Ratings.total) * 100);
  return (
    <Link
      href={`/physician/${Doctor.id}`}
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
                <div className="text-sm text-gray-600 mt-1">
                  {Ratings.total} ratings
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {Doctor.firstName} {Doctor.lastName}
                </h2>
                <div className="mb-2 mt-3">
                  Specialities:{" "}
                  {Doctor.specialties.map((specialty, index) => (
                    <span key={index} className="text-gray-600 mb-2">
                      {specialty}
                      {index !== Doctor.specialties.length - 1 && ", "}
                    </span>
                  ))}
                </div>
                <div className="mb-6">
                  Clinics:{" "}
                  {Doctor.clinics.map((clinic, index) => (
                    <span key={index} className="text-gray-600 mb-4">
                      {clinic.name}
                      {index !== Doctor.clinics.length - 1 && ", "}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-900">
                    <span className="text-2xl font-bold">{rPercent}%</span>{" "}
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
