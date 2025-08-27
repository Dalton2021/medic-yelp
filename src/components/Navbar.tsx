import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="h-20">
      <div className="h-full p-4">
        <div className="grid grid-cols-6 text-center h-full">
          <div className="col-start-5 flex justify-end items-center text-lg relative">
            <Image
              src="https://www.ratemyprofessors.com/assets/bkgd-blob-yellow-CkfZZZSs.svg"
              alt="blob"
              width={250}
              height={100}
              priority
              className="absolute z-0 object-contain"
            />
            <div className="z-10 px-5">
              <Link href="/login" className="font-semibold pe-5">
                Log In
              </Link>
              <Button className="rounded-full font-bold px-6">Sign Up</Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
