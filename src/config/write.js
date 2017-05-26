const { config } = require('../storage');

module.exports = (req, res) => {
  const { body } = req;
  if (!body.client || !body.version || !body.key || !body.value) {
    res.status(400).send('Bad Request');
  } else {
    try {
      const value = config.store(body);
      res.status(201).send(value);
    } catch (e) {
      res.status(500).send(e);
    }
  }
};
