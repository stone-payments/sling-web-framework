export const toSumBy = prop => (result, item) => result + (item[prop] || 0);
