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

  let similarDoctors: Doctor[] = [];
  
  if (dr) {
    console.log(dr);
    
    // Find doctors with matching specialties (excluding the current doctor)
    similarDoctors = doctors
      .filter(doctor => doctor.id !== dr.id) // Exclude current doctor
      .filter(doctor => 
        // Check if any of the doctor's specialties match the current doctor's specialties
        doctor.specialties.some(specialty => dr.specialties.includes(specialty))
      )
      .slice(0, 3); // Get first 3 matches
  }
  return dr ? (
    <div className="flex flex-col items-center gap-9">
      <div className="grid w-3/5 sm:grid-cols-1 lg:grid-cols-2 gap-x-12 h-full">
        <div className="flex flex-col">
          <POverallStats doctor={dr} reviews={reviewList} />
          <SimilarDocs doctor={dr} similarDoctors={similarDoctors} />
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
