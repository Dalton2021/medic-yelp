'use client';

import clinics from '@/data/clinics.json';
import { AutoComplete } from './AutoComplete';
import { useEffect, useState } from 'react';
import ClinicDropdownItem from './ClinicDropdownItem';

interface Items {
  id: number;
  name: string;
  address: {
    city: string;
    state: string;
  };
}

// Wrapper component that uses your data
export default function ClinicSearchCombobox() {
  const [selectedValue, setSelectedValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const items: Items[] = clinics?.map((clinic) => ({
    id: clinic.id,
    name: clinic.name,
    address: {
      city: clinic.address?.city,
      state: clinic.address?.state,
    },
  }));

  const autocompleteItems = items.map((item) => ({
    value: item.id.toString(),
    name: item.name,
    // label: item.name,
    label: <ClinicDropdownItem item={item} />,
  }));

  useEffect(() => {
    setSearchValue('');
    setSelectedValue('');
  }, []);

  return (
    <AutoComplete
      selectedValue={selectedValue}
      onSelectedValueChange={setSelectedValue}
      searchValue={searchValue}
      onSearchValueChange={setSearchValue}
      items={autocompleteItems}
      placeholder="Your clinic"
      emptyMessage="No clinics found."
    />
  );
}
