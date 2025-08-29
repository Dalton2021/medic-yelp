import Image from 'next/image';
import Link from 'next/link';
import { headers } from 'next/headers';
import NavForm from './NavForm';

const Navbar = async () => {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';

  const isClinicRoute = pathname.includes('clinic') || true;

  return (
    <nav className="h-16 bg-black text-white">
      <div className="h-full py-2 px-20">
        <div className="grid grid-cols-12 h-full">
          <div className="col-start-4 col-span-1 flex place-items-center">
            <Link href="/">
              <Image src="/rmp-icon.svg" alt="rmp" width={70} height={70} />
            </Link>
          </div>
          <NavForm isClinicRoute={isClinicRoute} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
