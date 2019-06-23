export const fromPath = path => path
  .map(key => (!Number.isNaN(Number(key)) ? `[${String(key)}]` : String(key)))
  .join('.')
  .replace(/\.\[/g, '[');
