export interface Book {
  author_key: string[];
  author_name: string[];
  ebook_access: string;
  edition_count: number;
  first_publish_year: number;
  has_fulltext: boolean;
  key: string;
  language: string[];
  public_scan_b: boolean;
  title: string;
}

export interface BookResponse {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  num_found: number;
  documentation_url: string;
  q: string;
  offset: null;
  docs: Book[];
}

export interface BookData {
  books: Book[];
  totalItems: number;
  totalPages: number;
  page: number;
}