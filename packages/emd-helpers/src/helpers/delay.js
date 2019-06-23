export const delay = (time = 0) =>
  new Promise(resolve => setTimeout(resolve, time));
