import { Doctor } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SimilarDocs({
  doctor,
  similarDoctors,
}: {
  doctor: Doctor;
  similarDoctors: Doctor[];
}) {
  return (
    <Card className="bg-[#d9e8ff9c]  ">
      <CardHeader className="pb-4">
        <h3 className="font-bold text-lg">Similar Physicians</h3>
      </CardHeader>
      <CardContent className="pt-0">
        {similarDoctors.length > 0 ? (
          <ul className="flex justify-start gap-5 items-center">
            {similarDoctors.map((similarDoctor) => (
              <li className=" no-underline" key={similarDoctor.id}>
                <a
                  href={`/physician/${similarDoctor.id}`}
                  className="flex items-center hover:text-blue-600"
                >
                  <span className="bg-[#0055fd] text-base rounded-lg py-1 px-3 hover:no-underline text-white mr-2 font-black">
                    {similarDoctor.averageRating || "N/A"}
                  </span>
                  <span className="text-left font-medium leading-none">
                    {similarDoctor.firstName}
                    <br />
                    {similarDoctor.lastName}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500 py-4">
            No similar physicians found
          </div>
        )}
      </CardContent>
    </Card>
  );
}
