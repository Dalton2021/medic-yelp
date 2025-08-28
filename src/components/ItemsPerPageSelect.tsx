'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface ItemsPerPageSelectProps {
  rows: string;
}

const ItemsPerPageSelect = ({ rows }: ItemsPerPageSelectProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleValueChange = (e: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (e !== '4') {
      params.set('rows', e);
    } else {
      params.delete('rows');
    }

    params.delete('page');

    const query = params.toString();
    router.push(`/search/clinics${query ? `?${query}` : ''}`);
  };

  return (
    <Select name="rows" value={rows} onValueChange={handleValueChange}>
      <SelectTrigger className="rounded-full">
        <SelectValue placeholder="Rows per page" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Rows per page</SelectLabel>
          <SelectItem value="4">4</SelectItem>
          <SelectItem value="6">6</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="12">12</SelectItem>
          <SelectItem value="15">15</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ItemsPerPageSelect;
