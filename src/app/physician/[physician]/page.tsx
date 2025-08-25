import AppNavbar from "../../../components/appNavbar";
import POverallStats from "@/components/POverallStats";
export default function Page() {
  return (
    <div className="grid lg:grid-cols-6 gap-x-12">
      <div className=" col-start-2 col-span-3 gap-x-12">
        <div className="grid grid-cols-2 gap-x-12">
          <POverallStats />
          <div>yolo</div>
        </div>
      </div>
    </div>
  );
}
