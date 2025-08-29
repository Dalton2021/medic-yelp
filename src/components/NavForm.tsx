'use client';

import { Apple, Hospital } from 'lucide-react';
import SearchCombobox from './SearchCombobox/SearchCombobox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useState } from 'react';

interface NavFormProps {
  isClinicRoute: boolean;
}

const NavForm = ({ isClinicRoute }: NavFormProps) => {
  const [selectState, setSelectState] = useState<boolean>(isClinicRoute);

  return (
    <>
      <div className="col-auto flex place-items-center">
        <Select
          value={selectState ? 'clinic' : 'doctor'}
          defaultValue={isClinicRoute ? 'clinic' : 'doctor'}
          onValueChange={(e: string) => {
            setSelectState(e === 'clinic');
          }}>
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
      <div className="col-span-2 flex place-items-center text-black">
        <SearchCombobox isClinic={selectState} />
      </div>
    </>
  );
};

export default NavForm;
