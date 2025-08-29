import PaginationBar from "@/components/PaginationBar";
import PCard from "@/components/PCard";
import PhysicianSeachBar from "@/components/PhysicianSearchBar";
import SortByPSelect from "@/components/SortByPSelect";

import doctorsData from "@/data/doctors.json";
import reviewsData from "@/data/reviews.json";
import {
  Doctor,
  Clinic,
  Review,
  ReviewBundle,
  DoctorAndReviews,
} from "@/types/index";
const allDoctors: Doctor[] = doctorsData as Doctor[];
const allReviews: Review[] = reviewsData as Review[];
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    name: string;
    page: string;
    rows: string;
    sort: string;
  }>;
}) {
  const { name, page, sort, rows } = await searchParams;

  const currentPage = parseInt(page || "1", 10);

  const doctors = name
    ? allDoctors.filter(
        (c) =>
          c.firstName.toLowerCase().includes(name.toLowerCase()) ||
          c.lastName.toLowerCase().includes(name.toLowerCase())
      )
    : allDoctors;
  const doctorIds: number[] = doctors.map((c) => c.id);

  const ratings = allReviews
    .filter((r) => doctorIds.includes(r.doctorId))
    .reduce((acc: { [key: number]: ReviewBundle }, review) => {
      if (!acc[review.doctorId]) {
        acc[review.doctorId] = {
          id: review.doctorId,
          total: 0,
          ratings: [],
          overall: 0,
        };
      }
      acc[review.doctorId].id = review.doctorId;
      acc[review.doctorId].total += 1;
      acc[review.doctorId].ratings.push(review.ratings.overall);
      return acc;
    }, {});

  Object.values(ratings).forEach((bundle) => {
    bundle.overall =
      Math.floor(
        (bundle.ratings.reduce((sum, rating) => sum + rating, 0) /
          bundle.ratings.length) *
          10
      ) / 10;
  });
  const doctorAndReviews: DoctorAndReviews[] = doctors
    .map((doctor) => ({
      Doctor: doctor,
      Ratings: ratings[doctor.id] || {
        id: doctor.id,
        total: 0,
        ratings: [],
        overall: 0,
      },
    }))
    .sort((a, b) => {
      if (sort === "name")
        return (
          a.Doctor.firstName.localeCompare(b.Doctor.firstName) &&
          a.Doctor.lastName.localeCompare(b.Doctor.lastName)
        );
      if (sort === "ratings") return b.Ratings.total - a.Ratings.total;

      return b.Ratings.overall - a.Ratings.overall;
    });

  const itemsPerPage = rows ? parseInt(rows) : 4;
  const pages = Math.ceil(doctorAndReviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDoctors = doctorAndReviews.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <div className="px-24 pb-32 pt-10 relative z-40">
      <div className="grid grid-flow-row grid-cols-8 gap-2 pt-5 pb-4">
        <div className="col-start-3 col-span-2 me-6">
          <PhysicianSeachBar name={name} />
        </div>
        {doctorAndReviews.length > 1 && (
          <>
            <div className="col-start-5 col-span-1">
              <SortByPSelect sort={sort || "quality"} />
            </div>
            <div className="col-start-6 col-span-1">
              {/* <ItemsPerPageSelect rows={rows || "4"} /> */}
            </div>
          </>
        )}

        <div className="col-start-3 col-span-3 pt-5">
          <p className="text-2xl text-black tracking-wide">
            {name ? (
              <>
                <span className="font-bold">{doctorAndReviews.length}</span>{" "}
                Doctors
                {doctorAndReviews.length !== 1 && "s"} found with{" "}
                <span className="font-bold">&quot;{name}&quot;</span> in their
                name.
              </>
            ) : (
              <>
                <span className="font-bold">{doctorAndReviews.length}</span>{" "}
                doctors found.
              </>
            )}
          </p>
        </div>
      </div>
      <div className="grid grid-flow-col grid-cols-8">
        {doctorAndReviews.length >= 1 ? (
          <>
            {paginatedDoctors.map((doc) => (
              <PCard
                key={doc.Doctor.id}
                Ratings={doc.Ratings}
                Doctor={doc.Doctor}
              />
            ))}
            {pages > 1 && (
              <div className="col-span-full">
                <PaginationBar currentPage={currentPage} pages={pages} />{" "}
              </div>
            )}
          </>
        ) : (
          <div className="col-start-3 col-span-4 pt-10"></div>
        )}
        <div className="col-start-3 col-span-4 text-center mt-6">
          <p className="pb-2">
            Don&apos;t see the clinic you&apos;re looking for?
          </p>
        </div>
      </div>
    </div>
  );
}
