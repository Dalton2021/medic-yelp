import { Card, CardContent } from "@/components/ui/card";
import { Bookmark } from "lucide-react";

export default function PCard({
  name = "John Seed",
  department = "Art",
  school = "Mt. San Jacinto College (all campuses)",
  rating = 4.7,
  totalRatings = 92,
  wouldTakeAgain = 93,
  difficultyLevel = 2,
}) {
  return (
    <Card className=" w-1/2 bg-white border border-gray-200 shadow-sm">
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
                <span className="text-white text-2xl font-bold">{rating}</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {totalRatings} ratings
              </div>
            </div>

            {/* Professor Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{name}</h2>
              <div className="text-gray-600 mb-2">{department}</div>
              <div className="text-gray-600 mb-4">{school}</div>

              {/* Stats */}
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-900">
                  <span className="text-2xl font-bold">{wouldTakeAgain}%</span>{" "}
                  would take again
                </span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-900">
                  <span className="text-2xl font-bold">{difficultyLevel}</span>{" "}
                  level of difficulty
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
  );
}
