const { config } = require('../storage');

const mapReduce = (elements) => {
  const data = elements.reduce((acc, c) => {
    const el = { rev: c.rev };
    el[c.key] = c.value;
    return Object.assign({}, acc, el);
  }, {});
  return { data: Object.assign({}, data, { rev: undefined }), rev: data.rev };
};

module.exports = (req, res) => {
  const { version, client } = req.params;
  const ifNoneMatch = req.headers['if-none-match'];
  let rev = null;
  if (ifNoneMatch) {
    rev = parseInt(ifNoneMatch.match(/W\/"([0-9]+)"/)[1], 10);
  }
  const found = config.find({ version, client }, rev);
  if (found.length > 0) {
    const { data, rev } = mapReduce(found);
    res.header({ ETag: `W/"${rev}"` });
    res.status(200).send(data);
  } else {
    res.status(304).send();
  }
};
