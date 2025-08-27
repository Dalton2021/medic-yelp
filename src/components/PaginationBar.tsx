'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';
import { useRouter } from 'next/navigation';

interface PaginationBarProps {
  pages: number;
  currentPage: number;
  searchParams?: Record<string, string | undefined>;
}

const PaginationBar = ({ pages, currentPage, searchParams = {} }: PaginationBarProps) => {
  const router = useRouter();

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    if (page >= 1) params.set('page', page.toString());

    const query = params.toString();

    router.push(query ? `?${query}` : '');
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => navigateToPage(currentPage - 1)}
            disabled={currentPage - 1 === 0}
          />
        </PaginationItem>
        {[...Array(pages).keys()].map((p) => {
          const page = p + 1;

          return (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => navigateToPage(p + 1)}
                isActive={currentPage === page}
                className={`${currentPage === page ? 'bg-blue-300 border-blue-200 hover:no-underline hover:bg-blue-500' : ''}`}>
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext onClick={() => navigateToPage(currentPage + 1)} disabled={currentPage === pages} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationBar;
