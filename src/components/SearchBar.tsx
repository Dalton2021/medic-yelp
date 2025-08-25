'use client';

import { Apple, Hospital } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState } from 'react';

const SearchBar = () => {
  const [isClinic, setIsClinic] = useState<boolean>(true);
  return (
    <>
      <h1 className="pt-10 font-semibold">
        {isClinic ? (
          <span>
            Enter your <span className="font-bold">clinic</span> to get started
          </span>
        ) : (
          <span>
            Find a <span className="font-bold">doctor</span>
          </span>
        )}
      </h1>
      <div className="relative text-black">
        {isClinic ? (
          <Hospital className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6" />
        ) : (
          <Apple className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6" />
        )}
        <Input
          name={isClinic ? 'clinic' : 'doctor'}
          className="bg-white h-14 !text-lg px-5 pl-14 mt-12 rounded-full"
          placeholder={`Your ${isClinic ? 'clinic' : 'doctor'}`}
          aria-label={isClinic ? 'Clinic' : 'Doctor'}
        />
      </div>
      <Button
        variant="link"
        className="text-white mt-3 font-semibold text-lg hover:no-underline"
        onClick={() => setIsClinic(!isClinic)}>
        {isClinic ? <>I&apos;d like to look up a doctor by name</> : <>I want to find a doctor at a clinic</>}
      </Button>
    </>
  );
};

export default SearchBar;
