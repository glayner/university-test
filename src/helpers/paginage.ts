interface IPaginate {
  data: any[];
  page: number;
  perPage: number;
  total: number;
}

export const paginate = ({data, page, perPage, total}: IPaginate)=> {
  let lastPage = total / perPage;

  const lastPageArr = lastPage.toString().split('.');

  if (lastPageArr[1]) {
    lastPage = +lastPageArr[0] + 1;
  } else {
    lastPage = +lastPageArr[0];
  }

  let prevPage = null;

  if (page > 1) {
    if (page > lastPage) {
      prevPage = lastPage;
    } else {
      prevPage = page - 1;
    }
  }

  const nextPage = page >= lastPage ? null : page + 1;

  return {
    total,
    perPage,
    page,
    prevPage,
    nextPage,
    lastPage,
    data,
  };
}