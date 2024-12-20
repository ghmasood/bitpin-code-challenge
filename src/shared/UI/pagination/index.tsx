import {
  BasicPagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from './basicPagination';
import { renderPageNumbers } from './services/renderPageNumbers';

type PaginationProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPage: number;
};

function Pagination({ page, setPage, totalPage }: PaginationProps) {
  return (
    <BasicPagination dir='ltr' className='select-none' onChange={(e) => console.log(e)}>
      <PaginationContent>
        <PaginationItem className={page > 1 ? '' : '!cursor-not-allowed opacity-50'}>
          <PaginationPrevious onClick={() => page > 1 && setPage((prev) => prev - 1)} />
        </PaginationItem>
        {renderPageNumbers(page, totalPage, setPage)}
        <PaginationItem className={page < totalPage ? '' : '!cursor-not-allowed opacity-50'}>
          <PaginationNext onClick={() => page < totalPage && setPage((prev) => prev + 1)} />
        </PaginationItem>
      </PaginationContent>
    </BasicPagination>
  );
}

export default Pagination;
