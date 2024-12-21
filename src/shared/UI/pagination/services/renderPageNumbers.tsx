import type { ReactNode } from 'react';

import { PaginationEllipsis, PaginationItem, PaginationLink } from '../BasicPagination';

export const renderPageNumbers = (
  page: number,
  totalPageCount: number,
  setPage: React.Dispatch<React.SetStateAction<number>>
) => {
  const items: ReactNode[] = [];
  const maxVisiblePages = 5;

  if (totalPageCount <= maxVisiblePages) {
    for (let i = 1; i <= totalPageCount; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={() => setPage(i)} isActive={page === i}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
  } else {
    items.push(
      <PaginationItem key={1}>
        <PaginationLink onClick={() => setPage(1)} isActive={page === 1}>
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (page > 3) {
      items.push(
        <PaginationItem key='ellipsis-start'>
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPageCount - 1, page + 1);

    for (let i = start; i <= end; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={() => setPage(i)} isActive={page === i}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (page < totalPageCount - 2) {
      items.push(
        <PaginationItem key='ellipsis-end'>
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    items.push(
      <PaginationItem key={totalPageCount}>
        <PaginationLink onClick={() => setPage(totalPageCount)} isActive={page === totalPageCount}>
          {totalPageCount}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return items;
};
