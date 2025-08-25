import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="p-4">
      <div className="bg-[url('https://www.ratemyprofessors.com/assets/bkgd-blob-yellow-CkfZZZSs.svg')] bg-no-repeat bg-right-bottom">
        <div className="grid grid-cols-6 text-center">
          <div className="col-start-5 flex justify-end items-center text-lg">
            <Link href="/login" className="font-semibold pe-5">
              Log In
            </Link>
            <Button className="rounded-full font-bold px-6">Sign Up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
