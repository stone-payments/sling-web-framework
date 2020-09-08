export const createRangeArray = (start, end = start) =>
  Array.from(Array(1 + (end - start)).keys()).map(item => item + start);
