import { Bookmark } from "lucide-react";
export default function POverallStats() {
  return (
    <div className="flex flex-col">
      <div>
        s
        <div className="flex">
          <div className="text-6xl font-black mr-3">3.4</div>
          <div className="text-lg font-bold text-neutral-400">/ 5</div>
        </div>
        <div className="mt-2.5 font-bold">
          Overall Quality Based on{" "}
          <a className="underline" href="#">
            32 ratings
          </a>
        </div>
      </div>
      <div className="mt-6">
        <div className="text-4xl font-black flex">
          <h1>Brian Johnson</h1>
          <button className="ml-2">
            <Bookmark color="#808080" />
          </button>
        </div>
        <div className="mt-4">
          <span>
            Professor in the{" "}
            <a href="#" className="underline">
              <b>Entomology department</b>
            </a>{" "}
            at{" "}
          </span>
          <a href="#" className="underline">
            <b>University of California Davis</b>
          </a>
        </div>
        <div className="mt-6 flex gap-y-6">
          <div className="flex flex-col text-center">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
