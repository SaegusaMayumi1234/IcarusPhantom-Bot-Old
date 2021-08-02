const Database = require("@replit/database")

const db = new Database()

async function set(key, value) { 
  return db.set(key, value);
}

async function get(key) {
  return db.get(key).then(value => {
    return value
  });
}

async function del(key) {
  return db.delete(key)
}

async function list() {
  return db.list().then(keys => {
    return keys
  });
}

exports.set = set;
exports.get = get;
exports.del = del;
exports.list = list;
