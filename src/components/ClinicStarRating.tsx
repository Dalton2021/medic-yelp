import { Star } from "lucide-react";
export default function ClinicStarRating({
  rating,
  label,
}: {
  rating: number;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-sm font-semibold">{rating}</span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < Math.floor(rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : i < rating
                  ? "fill-yellow-200 text-yellow-200"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
