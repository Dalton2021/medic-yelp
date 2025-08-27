import { Doctor } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SimilarDocs({ doctor }: { doctor: Doctor }) {
  return (
    <Card className="bg-[#d9e8ff9c]  ">
      <CardHeader className="pb-4">
        <h3 className="font-bold text-lg">Similar Physicians</h3>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="flex justify-between items-center">
          <li>
            <a className="flex items-center ">
              <span className="bg-[#0055fd] text-base py-1 px-2 text-white mr-2 font-black ">
                3.80
              </span>
              <span className="text-left leading-none">
                Keith
                <br /> Baker
              </span>
            </a>
          </li>
          <li>
            <a className="flex items-center ">
              <span className="bg-[#0055fd] text-base py-1 px-2 text-white mr-2 font-black ">
                3.80
              </span>
              <span className="text-left leading-none">
                Keith
                <br /> Baker
              </span>
            </a>
          </li>
          <li>
            <a className="flex items-center ">
              <span className="bg-[#0055fd] text-base py-1 px-2 text-white mr-2 font-black ">
                3.80
              </span>
              <span className="text-left leading-none">
                Keith
                <br /> Baker
              </span>
            </a>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
