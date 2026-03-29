export const generatePaginationNumbers = ( currentPage: number, totalPages: number) => {

  const maxVisible = 3;

  let start = Math.max(1, currentPage - 1);
  let end = start + maxVisible - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxVisible + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);

}