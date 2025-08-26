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
 - Need to create and import the Clinics data. Create a clinics.json file
*/

export default function Page() {
  return <div>Clinic list</div>;
}
