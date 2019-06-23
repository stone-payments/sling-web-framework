export const toFlatEntries = (result, [key, value]) =>
  ({ ...result, [key]: value });
