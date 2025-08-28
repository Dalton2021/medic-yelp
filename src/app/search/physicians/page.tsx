import ClinicCard from "@/components/ClinicCard";
import PaginationBar from "@/components/PaginationBar";
import PCard from "@/components/PCard";
import RatBanner from "@/components/RatBanner";
import doctorsData from "@/data/doctors.json";
import reviewsData from "@/data/reviews.json";
import { Doctor, Clinic, Review, ReviewBundle } from "@/types/index";
const allDoctors: Doctor[] = doctorsData as Doctor[];
const allReviews: Review[] = reviewsData as Review[];
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ name: string; page: string }>;
}) {
  const { name, page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const doctors = name
    ? allDoctors.filter(
        (c) =>
          c.firstName.toLowerCase().includes(name.toLowerCase()) ||
          c.lastName.toLowerCase().includes(name.toLowerCase())
      )
    : allDoctors;
  const doctorIds: number[] = doctors.map((c) => c.id);

  return (
    <div className="px-24 pb-32 pt-10 relative z-40">
      <div className="flex flex-col items-center">
        <PCard />
      </div>
    </div>
  );
}
