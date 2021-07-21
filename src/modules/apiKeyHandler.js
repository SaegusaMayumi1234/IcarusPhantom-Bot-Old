const Database = require("@replit/database")

const db = new Database()

var apikey = "none"

db.get("apikey").then(value => {
  console.log(value)
  if (value === null) {
    db.set("apikey", apikey)
  } else {
    apikey = value
  }
})

function save(data) {
  db.set("apikey", data).then(() => {});
  apikey = data
}

function get() {
  return apikey
} 

exports.save = save;
exports.get = get;