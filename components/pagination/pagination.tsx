'use client';

import { generatePaginationNumbers } from '@/utils/generatePaginationNumbers';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { redirect, usePathname, useSearchParams } from 'next/navigation';

interface Props {
  totalPages: number;
}

export const PaginationComponent = ({ totalPages }: Props) => {

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageString = searchParams.get('page') ?? 1;
  const currentPage = isNaN( +pageString ) ? 1 : +pageString;

  if (currentPage < 1 || isNaN(+pageString) ) {
    redirect( pathname );
  }

  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = ( pageNumber: number | string ) => {

    const params = new URLSearchParams( searchParams );

    if ( pageNumber === '...' ) {
      return `${ pathname }?${ params.toString() }`
    }

    if ( +pageNumber <= 0 ) {
      return `${ pathname }`;
    }

    if ( +pageNumber > totalPages ) {
      return `${pathname}?${ params.toString() }`;
    }

    params.set('page', pageNumber.toString());
    return `${  pathname }?${ params.toString() }`;

  }

  return (
    <Pagination>
      <PaginationContent className='w-100 flex items-center justify-between'>
          <PaginationItem>
            <PaginationPrevious
              href={ createPageUrl( currentPage - 1 ) }
              className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>

          <div className='flex justify-center gap-2"'>
            {
              allPages.map( (page, index) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    href={ createPageUrl( page ) }
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))
            }
          </div>

          <PaginationItem className="justify-self-end">
            <PaginationNext
              href={ createPageUrl( currentPage + 1 ) }
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};