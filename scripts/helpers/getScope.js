module.exports = () => process.env.PKG_SCOPE || process.argv[2] || '*';
