const Loki = require('lokijs');

const db = new Loki('db');

const config = db.addCollection('config', { indices: ['client', 'version'] });
const configStore = {
  store(data) {
    const rev = config.find({ client: data.client, version: data.version }).length + 1;
    config.insert(Object.assign(data, { rev }));
  },
  find(query, rev) {
    return config.chain()
    .find(Object.assign({}, query))
    .where((o) => {
      if (rev) {
        return o.rev > rev;
      }
      return true;
    })
    .simplesort('rev')
    .data();
  },
};

module.exports = { db, config: configStore };
