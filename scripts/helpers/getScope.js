module.exports = () => {
  return process.env.PKG_SCOPE || process.argv[2] || '*';
};
