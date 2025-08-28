import { Rat } from 'lucide-react';

const RatBanner = () => {
  return (
    <div className="text-2xl tracking-wider p-4 border-t-4 border-b-4 border-slate-400/15 flex justify-center items-center bg-slate-200/30">
      <div className="text-center">
        <p className="italic font-extrabold">Oh no!</p>
        <p className="flex items-center mt-3">
          A little friend took your results... <Rat size={40} className="ms-10 text-amber-800" />
        </p>
      </div>
    </div>
  );
};

export default RatBanner;
