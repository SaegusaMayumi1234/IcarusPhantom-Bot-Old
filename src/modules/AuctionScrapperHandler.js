const db = require('./DatabaseManager')
const axios = require('axios')

var lbinName = {}
var lbinID = {}

db.get("lbinName").then(value => {
  if (value === null) {
    db.set("lbinName", lbinName)
  } else if (value !== null) {
    lbinName = value
    console.log("Success get database from lbinName")
  }
});

db.get("lbinID").then(value => {
  if (value === null) {
    db.set("lbinID", lbinID)
  } else if (value !== null) {
    lbinID = value
    console.log("Success get database from lbinID")
  }
});

function get(param) {
  if (param === "lbinName") {
    return lbinName
  } else if (param === "lbinID") {
    return lbinID
  }
}

function savelbin() {
  /*axios.get("https://IcarusPhantom-API.saegusamayumi.repl.co/api/auction/lbinname.json")
  .then(data => {
    lbinName = data.data
    db.set("lbinName", lbinName)
  })
  .catch(error => {
    console.log(error)
  })
  axios.get("https://IcarusPhantom-API.saegusamayumi.repl.co/api/auction/lbinid.json")
  .then(data => {
    lbinID = data.data
    db.set("lbinID", lbinID)
  })
  .catch(error => {
    console.log(error)
  })*/
  axios.get("https://auction-scrapper.herokuapp.com/api/auction/lbinname.json")
  .then(data => {
    lbinName = data.data
    db.set("lbinName", lbinName)
  })
  .catch(error => {
    backuplbinname()
    //console.log(error)
  })
  axios.get(" api/auction/lbinid.json")
  .then(data => {
    lbinID = data.data
    db.set("lbinID", lbinID)
  })
  .catch(error => {
    backuplbinid()
    //console.log(error)
  })
}

function savelbinName(data) {
  lbinName = data
  db.set("lbinName", lbinName)
  //console.log(data)
  axios.get("https://auction-scrapper.herokuapp.com/")
  .then(data => {
    
  })
  .catch(error => {
    axios.get("https://auction-scrapper2.herokuapp.com/")
    .then(data => {

    })
    .catch(error => {
      
    })
  })
}

function savelbinID(data) {
  lbinID = data
  db.set("lbinID", lbinID)
}

function backuplbinname() {
  axios.get("https://auction-scrapper2.herokuapp.com/api/auction/lbinname.json")
  .then(data => {
    lbinName = data.data
    db.set("lbinName", lbinName)
  })
  .catch(error => {
    //console.log(error)
  })
}

function backuplbinid() {
  axios.get("https://auction-scrapper2.herokuapp.com/api/auction/lbinid.json")
  .then(data => {
    lbinID = data.data
    db.set("lbinID", lbinID)
  })
  .catch(error => {
    //console.log(error)
  })
}

exports.savelbin = savelbin;
exports.get = get;
exports.savelbinName = savelbinName;
exports.savelbinID = savelbinID;