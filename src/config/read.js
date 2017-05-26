const { config } = require('../storage');

const mapReduce = elements => elements.reduce((acc, c) => {
  const el = {};
  el[c.key] = c.value;
  return Object.assign({}, acc, el);
}, {});

module.exports = (req, res) => {
  const { version, client } = req.params;
  const ifNoneMatch = req.headers['if-none-match'];
  let rev = null;
  if (ifNoneMatch) {
    rev = parseInt(ifNoneMatch.match(/W\/"([0-9]+)"/)[1], 10);
  }
  const found = config.find({ version, client }, rev);
  if (found.length > 0) {
    res.status(200).send(mapReduce(found));
  } else {
    res.status(304).send();
  }
};
