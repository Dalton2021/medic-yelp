import DoctorRatingChart from "@/components/DoctorRatingChart";
import POverallStats from "@/components/POverallStats";
import SimilarDocs from "@/components/SimilarDocs";
import ReviewCard from "@/components/ReviewCard";
import doctors from "@/data/doctors.json";
import { Doctor } from "@/types";
export default async function Page({
  params,
}: {
  params: Promise<{ physician: string }>;
}) {
  const { physician } = await params;
  const d: Doctor | undefined = (doctors as Doctor[]).find((doctor) => {
    return doctor.id === Number(physician);
  });
  console.log(d);
  return (
    <div className="flex flex-col items-center gap-9">
      <div className="grid w-3/5 sm:grid-cols-1 lg:grid-cols-2 gap-x-12">
        <div>
          <POverallStats />
        </div>
        <div className="flex flex-col">
          <DoctorRatingChart />
          <SimilarDocs />
        </div>
      </div>
      <div className="flex w-full justify-center items-center mt-10">
        <ReviewCard />
      </div>
    </div>
  );
}
