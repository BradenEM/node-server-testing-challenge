const db = require('./database/dbConfig');

module.exports = {
  insert,
  remove
};

async function insert(name) {
  const [id] = await db('test').insert(name, 'id');
  return db('test').where({ id }).first();
}

async function remove(id) {
  return db('test').where({ id }).del();
}
