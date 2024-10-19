const colors = require('colors');

module.exports = (err, req, res, next) => {
  console.error('Internal Server Error'.red, err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
};
