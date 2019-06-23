export const arraysEqual = (arrA, arrB) =>
  arrA.length === arrB.length &&
  arrA.every((item, index) => item === arrB[index]);
