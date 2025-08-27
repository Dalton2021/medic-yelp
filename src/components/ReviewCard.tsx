import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Clock, Building, User } from "lucide-react";
import { CircleUser } from "lucide-react";
import { Review, Clinic } from "@/types";
import dayjs from "dayjs";
const ReviewCard = ({
  review,
  doctor,
  clinicsEmployed,
}: {
  review: Review;
  doctor: string;
  clinicsEmployed: Clinic[];
}) => {
  const formatDate = (dateString: string): string => {
    return dayjs(dateString).format("MMM DD, YYYY");
  };

  type StarRatingProps = {
    rating: number;
    label: string;
  };
  const clinicSeen = clinicsEmployed.find((clinic) => {
    return clinic.id === review.clinicId;
  });
  const StarRating = ({ rating, label }: StarRatingProps) => (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600 capitalize">
        {label.replace("_", " ")}
      </span>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-700">{rating}</span>
      </div>
    </div>
  );

  return (
    <Card className="w-1/2 bg-blue-50  mb-10">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            <CircleUser className="w-7 h-7" />
          </CardTitle>
          <div className="flex items-center text-yellow-500">
            <Star className="w-7 h-7 fill-current mr-1" />
            <span className="font-semibold text-lg">
              {review.ratings.overall}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Patient Info */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <span>Patient Age: {review.patientAge}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>{formatDate(review.visitDate)}</span>
          </div>
        </div>

        {/* Doctor & Clinic IDs */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Dr. {doctor}</span>
          <div className="flex items-center">
            <Building className="w-4 h-4 mr-1" />
            <span>{clinicSeen?.name || "Unknown Clinic"}</span>
          </div>
        </div>

        {/* Ratings Breakdown */}
        <div className="border-t pt-4 space-y-3">
          <h4 className="font-medium text-gray-900 mb-3">Rating Breakdown</h4>
          <StarRating rating={review.ratings.overall} label="overall" />
          <StarRating
            rating={review.ratings.bedside_manner}
            label="bedside_manner"
          />
          <StarRating rating={review.ratings.waitTime} label="waitTime" />
          <StarRating
            rating={review.ratings.officeEnvironment}
            label="officeEnvironment"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
