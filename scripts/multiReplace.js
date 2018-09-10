const multiReplace = (str, replacements = []) => replacements
  .reduce((result, { from, to }) => result.replace(from, to), str);

module.exports = multiReplace;
