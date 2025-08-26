import DoctorRatingChart from "@/components/DoctorRatingChart";
import AppNavbar from "../../../components/appNavbar";
import POverallStats from "@/components/POverallStats";
import SimilarDocs from "@/components/SimilarDocs";
export default function Page() {
  return (
    <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-x-12">
      <div className=" col-start-2 col-span-3 gap-x-12">
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-x-12">
          <div>
            <POverallStats />
            <div>More Deets</div>
          </div>
          <div className="flex flex-col">
            <DoctorRatingChart />
            <SimilarDocs />
          </div>
        </div>
      </div>
    </div>
  );
}
