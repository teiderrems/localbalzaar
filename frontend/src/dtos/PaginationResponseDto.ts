export type PaginationResponseDto<T>= {
  total: number;

  data?: T[];

  pageSize: number;
}
