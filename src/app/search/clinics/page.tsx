import ClinicCard from '@/components/ClinicCard';
import clinicsData from '@/data/clinics.json';
import { Clinic, ClinicAndReviews, ReviewBundle } from '@/types';
import reviewsData from '@/data/reviews.json';
import RatBanner from '@/components/RatBanner';
import PaginationBar from '@/components/PaginationBar';
import ItemsPerPageSelect from '@/components/ItemsPerPageSelect';
import SortBySelect from '@/components/SortBySelect';
import ClinicSearchBar from '@/components/ClinicSearchBar';
import { Metadata } from 'next';
import Link from 'next/link';

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

export const metadata: Metadata = {
  title: 'Search clinics',
};

const allClinics: Clinic[] = clinicsData;

interface PageProps {
  searchParams: {
    name?: string;
    page: string;
    rows: string;
    sort: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const { name, page, rows, sort } = await searchParams;
  const currentPage = parseInt(page || '1', 10);
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

  const clinicAndReviews: ClinicAndReviews[] = clinics
    .map((clinic) => ({
      Clinic: clinic,
      Ratings: ratings[clinic.id] || {
        id: clinic.id,
        total: 0,
        ratings: [],
        overall: 0,
      },
    }))
    .sort((a, b) => {
      if (sort === 'name') return a.Clinic.name.localeCompare(b.Clinic.name);
      if (sort === 'ratings') return b.Ratings.total - a.Ratings.total;

      return b.Ratings.overall - a.Ratings.overall;
    });

  const itemsPerPage = rows ? parseInt(rows) : 4;
  const pages = Math.ceil(clinicAndReviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClinics = clinicAndReviews.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="px-24 pb-32 pt-10 relative z-40">
      <div className="grid grid-flow-row grid-cols-8 gap-2 pt-5 pb-4">
        <div className="col-start-3 col-span-2 me-6">
          <ClinicSearchBar name={name} />
        </div>
        {clinicAndReviews.length > 1 && (
          <>
            <div className="col-start-5 col-span-1">
              <SortBySelect sort={sort || 'quality'} />
            </div>
            <div className="col-start-6 col-span-1">
              <ItemsPerPageSelect rows={rows || '4'} />
            </div>
          </>
        )}

        <div className="col-start-3 col-span-3 pt-5">
          <p className="text-2xl text-black tracking-wide">
            {name ? (
              <>
                <span className="font-bold">{clinicAndReviews.length}</span> clinic
                {clinicAndReviews.length !== 1 && 's'} found with{' '}
                <span className="font-bold">&quot;{name}&quot;</span> in their name.
              </>
            ) : (
              <>
                <span className="font-bold">{clinicAndReviews.length}</span> clinics found.
              </>
            )}
          </p>
        </div>
      </div>
      <div className="grid grid-flow-col grid-cols-8">
        {clinicAndReviews.length >= 1 ? (
          <>
            {paginatedClinics.map((c) => (
              <ClinicCard key={c.Clinic.id} Clinic={c.Clinic} Ratings={c.Ratings} />
            ))}
            {pages > 1 && (
              <div className="col-span-full">
                <PaginationBar currentPage={currentPage} pages={pages} />{' '}
              </div>
            )}
          </>
        ) : (
          <div className="col-start-3 col-span-4 pt-10">
            <RatBanner />
          </div>
        )}
        <div className="col-start-3 col-span-4 text-center mt-6">
          <p className="pb-2">Don&apos;t see the clinic you&apos;re looking for?</p>
          <Link href="/add/clinic" className='font-medium'>Add a clinic</Link>
        </div>
      </div>
    </div>
  );
}
