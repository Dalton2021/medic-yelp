'use client';

import doctors from '@/data/doctors.json';
import clinics from '@/data/clinics.json';
import { AutoComplete } from './AutoComplete';
import { useEffect, useState } from 'react';
import ClinicDropdownItem from './ClinicDropdownItem';
import DoctorDropdownItem from './DoctorDropdownItem';

export default function DoctorSearchCombobox() {
  const [selectedDoctorValue, setSelectedDoctorValue] = useState<string>('');
  const [searchDoctorValue, setSearchDoctorValue] = useState<string>('');
  const [selectedClinicValue, setSelectedClinicValue] = useState<string>('');
  const [searchClinicValue, setSearchClinicValue] = useState<string>('');

  const clinicItems = clinics?.map((clinic) => ({
    id: clinic.id,
    name: clinic.name,
    address: {
      city: clinic.address?.city,
      state: clinic.address?.state,
    },
  }));

  const doctorItems = doctors?.map((doctor) => ({
    id: doctor.id,
    name: `${doctor.firstName} ${doctor.lastName}`,
    specialties: doctor.specialties,
    clinics: doctor.clinics,
  }));

  const doctorAutoCompleteItems = doctorItems.map((item) => ({
    value: item.id.toString(),
    name: item.name,
    label: <DoctorDropdownItem item={item} />,
  }));

  const clinicAutoCompleteItems = clinicItems.map((item) => ({
    value: item.id.toString(),
    name: item.name,
    label: <ClinicDropdownItem item={item} />,
  }));

  useEffect(() => {
    setSelectedDoctorValue('');
    setSearchDoctorValue('');
    setSelectedClinicValue('');
    setSearchClinicValue('');
  }, []);

  return (
    <>
      <AutoComplete
        roundedFull={false}
        inputClassName="rounded-full rounded-e-none"
        selectedValue={selectedDoctorValue}
        onSelectedValueChange={setSelectedDoctorValue}
        searchValue={searchDoctorValue}
        onSearchValueChange={setSearchDoctorValue}
        items={doctorAutoCompleteItems}
        placeholder="Your doctor"
        emptyMessage="No doctors found."
      />
      <AutoComplete
        roundedFull={false}
        inputClassName="rounded-full rounded-s-none"
        selectedValue={selectedClinicValue}
        onSelectedValueChange={setSelectedClinicValue}
        searchValue={searchClinicValue}
        onSearchValueChange={setSearchClinicValue}
        items={clinicAutoCompleteItems}
        placeholder="Your clinic"
        emptyMessage="No clinics found."
      />
    </>
  );
}
