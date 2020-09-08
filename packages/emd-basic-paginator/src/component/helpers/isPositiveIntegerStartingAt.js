export const isPositiveIntegerStartingAt = (start, value) =>
  typeof value === 'number' && value >= start && value === Math.round(value);
