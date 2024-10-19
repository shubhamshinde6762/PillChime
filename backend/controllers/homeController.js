module.exports.home = function (req, res) {
  return res.status(200).json('Success');
};
module.exports.NotFound = function (req, res) {
  return res.status(404).json('Not Found');
};
