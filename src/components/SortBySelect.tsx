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

interface SortBySelectProps {
  sort: string;
}

const SortBySelect = ({ sort = 'rating' }: SortBySelectProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleValueChange = (e: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (e !== 'quality') {
      params.set('sort', e);
    } else {
      params.delete('sort');
    }

    params.delete('page');

    const query = params.toString();
    router.push(`/search/clinics${query ? `?${query}` : ''}`);
  };

  return (
      <Select value={sort} name="sort" onValueChange={handleValueChange}>
        <SelectTrigger className='rounded-full'>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort by</SelectLabel>
            <SelectItem value="quality">Quality</SelectItem>
            <SelectItem value="ratings">Total ratings</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
  );
};

export default SortBySelect;
