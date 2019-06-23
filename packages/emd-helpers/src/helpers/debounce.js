export const debounce = (fn, time = 0) => {
  let timeout;

  return (...args) => {
    const functionCall = () => fn(...args);
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};
