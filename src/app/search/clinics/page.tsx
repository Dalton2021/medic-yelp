import clinicsData from '@/data/clinics.json';
import { Clinic } from '@/types';

const clinics: Clinic[] = clinicsData;
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

export default function Page() {
  return (
    <div className="px-20 pt-32">
      {/* {clinics.map((clinic) => (
        <div key={clinic.id}>{clinic.name}</div>
      ))} */}
      <div className="grid grid-flow-col grid-cols-10 gap-10">
        <div className="col-start-3 col-span-6 bg-neutral-100 p-5">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-2">
              <p className="text-sm font-medium uppercase tracking-wide text-center">Quality</p>
              <div className="flex justify-center">
                <div className="mt-2 w-3/4 bg-emerald-300 p-2 align-middle">
                  <p className="text-4xl font-extrabold tracking-tight text-center">4.7</p>
                </div>
              </div>
              <p className="mt-1 text-sm text-muted-foreground text-center">120 ratings</p>
            </div>
            <div className="col-span-4 flex items-center">
              <p className="text-5xl font-extrabold">My Clinic</p>
            </div>
            <div className="col-span-3 col-end-13">
              <p className="text-muted-foreground text-sm">
                <span>Street address</span>
                <br />
                <span>City,</span> <span className='uppercase'>State,</span> <span>ZIP Code</span>
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
