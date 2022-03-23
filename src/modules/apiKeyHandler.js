const db = require('./DatabaseManager')
var apikey = "none"

db.get("apikey").then(value => {
  console.log(value)
  if (value === null) {
    db.set("apikey", apikey)
  } else {
    apikey = value
    console.log("Success get database from apikey")
  }
})

function save(data) {
  db.set("apikey", data)
  apikey = data
}

function get() {
  return apikey
} 

exports.save = save;
exports.get = get;