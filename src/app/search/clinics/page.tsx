import ClinicCard from '@/components/ClinicCard';
import clinicsData from '@/data/clinics.json';
import { Clinic, ClinicAndReviews, ReviewBundle } from '@/types';
import reviewsData from '@/data/reviews.json';
import { Rat } from 'lucide-react';
import RatBanner from '@/components/RatBanner';

/*
TO-DO:
-------
 - Navbar change for pages outside of index
    - Create a second Navbar component, call it something else. HeroNavbar for index page and ServerNavbar for everywhere else.
    - Needs a search bar. Similar to the index search bar but semi different.
    - Needs a dropdown that populates available clinics (minimum of 3 characters before a dropdown populates). Probably a package we can npm for this. Or shad has an option. TBD.
 - Navbar needs needs a variant for if you're logged in or not
 - Log in / sign up functionality
    - Need a context provider for users being signed in or not. This needs to play a part in the Navbar changes up above. ^^^
 - Do this page https://www.ratemyprofessors.com/search/schools?q=stanford
*/

const allClinics: Clinic[] = clinicsData;

interface PageProps {
  searchParams: { name?: string };
}

export default async function Page({ searchParams }: PageProps) {
  const { name } = await searchParams;
  const clinics = name
    ? allClinics.filter((c) => c.name.toLowerCase().includes(name.toLowerCase()))
    : allClinics;
  const clinicIds: number[] = clinics.map((c) => c.id);

  const ratings = reviewsData
    .filter((r) => clinicIds.includes(r.clinicId))
    .reduce((acc: { [key: number]: ReviewBundle }, review) => {
      if (!acc[review.clinicId]) {
        acc[review.clinicId] = {
          id: review.clinicId,
          total: 0,
          ratings: [],
          overall: 0,
        };
      }

      acc[review.clinicId].id = review.clinicId;
      acc[review.clinicId].total += 1;
      acc[review.clinicId].ratings.push(review.ratings.overall);
      return acc;
    }, {});

  Object.values(ratings).forEach((bundle) => {
    bundle.overall =
      Math.floor((bundle.ratings.reduce((sum, rating) => sum + rating, 0) / bundle.ratings.length) * 10) / 10;
  });

  const clinicAndReviews: ClinicAndReviews[] = clinics.map((clinic) => ({
    Clinic: clinic,
    Ratings: ratings[clinic.id] || {
      id: clinic.id,
      total: 0,
      ratings: [],
      overall: 0,
    },
  }));

  return (
    <div className="px-24 pt-32">
      <div className="grid grid-flow-col grid-cols-7">
        {clinicAndReviews.length > 1 ? (
          clinicAndReviews.map((c) => <ClinicCard key={c.Clinic.id} Clinic={c.Clinic} Ratings={c.Ratings} />)
        ) : (
          <div className="col-start-3 col-span-3">
            <RatBanner />
          </div>
        )}
      </div>
    </div>
  );
}
