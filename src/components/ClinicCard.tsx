import { ClinicAndReviews } from '@/types';
import Link from 'next/link';

const ClinicCard = ({ Clinic, Ratings }: ClinicAndReviews) => {
  return (
    <Link
      href={`/clinic/${Clinic.id}`}
      className="col-start-3 col-span-4 bg-neutral-100 p-5 mb-4 hover:no-underline">
      <div className="grid grid-cols-6 gap-8">
        <div className="col-span-1">
          <p className="text-sm font-medium uppercase tracking-wide text-center">Quality</p>
          <div className="flex justify-center">
            <div className="mt-2 w-full bg-emerald-300 p-2 align-middle">
              <p className="text-4xl font-extrabold tracking-tight text-center">{Ratings.overall}</p>
            </div>
          </div>
          <p className="mt-1 text-sm text-muted-foreground text-center">{Ratings.total} ratings</p>
        </div>
        <div className="col-span-5 flex items-center">
          <p className="text-3xl font-extrabold">{Clinic.name}</p>
        </div>
        <div className="col-span-3 col-end-13">
          <p className="text-muted-foreground text-sm">
            {Clinic.address.city}, <span className="uppercase">{Clinic.address.state}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ClinicCard;
