import Image from 'next/image';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Apple, Hospital } from 'lucide-react';
import { headers } from 'next/headers';

const Navbar = async () => {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';

  const isClinicRoute = pathname.includes('clinic');

  return (
    <nav className="h-16 bg-black text-white">
      <div className="h-full py-2 px-20">
        <div className="grid grid-cols-12 h-full">
          <div className="col-start-4 col-span-1 flex place-items-center">
            <Link href="/">
              <Image src="/rmp-icon.svg" alt="rmp" width={70} height={70} />
            </Link>
          </div>
          <div className="col-auto flex place-items-center">
            <Select defaultValue={isClinicRoute ? 'clinic' : 'doctor'}>
              <SelectTrigger className="bg-transparent border-0 text-xl tracking-wide">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clinic">
                  <span className="flex place-items-center justify-between">
                    <Hospital size={25} /> <span className="ps-2">Clinic</span>
                  </span>
                </SelectItem>
                <SelectItem value="doctor">
                  <span className="flex place-items-center justify-between">
                    <Apple size={25} /> <span className="ps-2">Doctor</span>
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
