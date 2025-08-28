'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationBarProps {
  pages: number;
  currentPage: number;
}

const PaginationBar = ({ pages, currentPage }: PaginationBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page >= 1) params.set('page', page.toString());

    const query = params.toString();

    router.push(query ? `?${query}` : '');
  };

  // Generate page numbers with ellipsis logic
  const generatePageNumbers = () => {
    const items = [];
    const totalPages = pages;
    const current = currentPage;

    // Always show first page
    items.push(1);

    // Calculate the range around current page
    let startRange = Math.max(2, current - 2);
    let endRange = Math.min(totalPages - 1, current + 2);

    // Adjust range if we're near the beginning or end
    if (current <= 4) {
      startRange = 2;
      endRange = Math.min(7, totalPages - 1);
    } else if (current >= totalPages - 3) {
      startRange = Math.max(2, totalPages - 6);
      endRange = totalPages - 1;
    }

    // Add ellipsis before start range if needed
    if (startRange > 2) {
      items.push('ellipsis-start');
    }

    // Add pages in range
    for (let i = startRange; i <= endRange; i++) {
      items.push(i);
    }

    // Add ellipsis after end range if needed
    if (endRange < totalPages - 1) {
      items.push('ellipsis-end');
    }

    // Always show last page (if more than 1 page)
    if (totalPages > 1) {
      items.push(totalPages);
    }

    return items;
  };

  const pageItems = generatePageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => navigateToPage(currentPage - 1)}
            disabled={currentPage - 1 === 0}
          />
        </PaginationItem>

        {pageItems.map((item, index) => {
          if (item === 'ellipsis-start' || item === 'ellipsis-end') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const page = item as number;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => navigateToPage(page)}
                isActive={currentPage === page}
                className={`${
                  currentPage === page ? 'bg-blue-200/50 hover:no-underline hover:bg-blue-400/40' : ''
                }`}
              >
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
