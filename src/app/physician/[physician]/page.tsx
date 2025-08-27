import DoctorRatingChart from "@/components/DoctorRatingChart";
import POverallStats from "@/components/POverallStats";
import SimilarDocs from "@/components/SimilarDocs";
import ReviewCard from "@/components/ReviewCard";
import doctorsData from "@/data/doctors.json";
import reviewsData from "@/data/reviews.json";
import { Doctor, Review } from "@/types";
const doctors: Doctor[] = doctorsData as Doctor[];
const reviews: Review[] = reviewsData as Review[];

export default async function Page({
  params,
}: {
  params: Promise<{ physician: string }>;
}) {
  const { physician } = await params;
  const dr = doctors.find((doctor) => {
    return doctor.id === Number(physician);
  });

  const reviewList: Review[] = dr
    ? reviews.filter((review) => {
        return dr.id === review.doctorId;
      })
    : [];

  if (dr) {
    console.log(dr);
  }
  return dr ? (
    <div className="flex flex-col items-center gap-9">
      <div className="grid w-3/5 sm:grid-cols-1 lg:grid-cols-2 gap-x-12 h-full">
        <div className="flex flex-col">
          <POverallStats doctor={dr} reviews={reviewList} />
          <SimilarDocs doctor={dr} />
        </div>
        <div className="flex flex-col">
          <DoctorRatingChart reviews={reviewList} />
        </div>
      </div>
      <div className="flex flex-col w-full justify-center items-center mt-10">
        {reviewList.map((review, index) => (
          <ReviewCard
            doctor={dr.firstName + " " + dr.lastName}
            key={index}
            review={review}
            clinicsEmployed={dr.clinics}
          />
        ))}
      </div>
    </div>
  ) : (
    <div>Doctor not found</div>
  );
}
