'use client';

import doctors from '@/data/doctors.json';
import clinics from '@/data/clinics.json';
import { AutoComplete } from './AutoComplete';
import { useState } from 'react';

interface Items {
  id: number;
  name: string;
  address?: {
    city?: string;
    state?: string;
  };
  specialties?: string[];
}

interface SearchComboboxProps {
  isClinic: boolean;
}

// Wrapper component that uses your data
export default function SearchCombobox({ isClinic }: SearchComboboxProps) {
  const [selectedValue, setSelectedValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const items: Items[] = isClinic
    ? clinics?.map((clinic) => ({
        id: clinic.id,
        name: clinic.name,
        address: {
          city: clinic.address?.city,
          state: clinic.address?.state,
        },
      }))
    : doctors?.map((doctor) => ({
        id: doctor.id,
        name: `${doctor.firstName} ${doctor.lastName}`,
        specialties: doctor.specialties,
      }));

  const autocompleteItems = items.map((item) => ({
    value: item.id.toString(),
    label: item.name,
  }));

  return (
    <AutoComplete
      selectedValue={selectedValue}
      onSelectedValueChange={setSelectedValue}
      searchValue={searchValue}
      onSearchValueChange={setSearchValue}
      items={autocompleteItems}
      placeholder={isClinic ? 'Your clinic' : 'Your doctor'}
      emptyMessage={isClinic ? 'No clinics found.' : 'No doctors found.'}
    />
  );
}
