const fetchData = require('../utils/fetchData')
const db = require('./DatabaseManager')

var dataCache = {
  lbin: "none",
  lbin1day: "none",
  shiiyubz: "none",
  hypixelbz: "none"
}

db.get("bzah").then(value => {
  if (value === null) {
    db.set("bzah", dataCache)
  } else if (value !== null) {
    dataCache = value
  }
});

const moulberryurl = ["https://moulberry.codes/", "http://moulberry.codes/", "http://51.79.51.21/"]
const moulberryparam = ['lowestbin.json', 'auction_averages_lbin/1day.json']

async function start() {
  var lbinData = await fetchData(moulberryurl[0] + moulberryparam[0])
  if (lbinData.status !== 200) {
    lbinData = await fetchData(moulberryurl[1] + moulberryparam[0])
    if (lbinData.status !== 200) {
      lbinData = await fetchData(moulberryurl[2] + moulberryparam[0])
    }
  }
  if (lbinData.status == 200) {
    dataCache.lbin = lbinData.data
  }
  var lbin1dayData = await fetchData(moulberryurl[0] + moulberryparam[1])
  if (lbin1dayData.status !== 200) {
    lbin1dayData = await fetchData(moulberryurl[1] + moulberryparam[1])
    if (lbin1dayData.status !== 200) {
      lbin1dayData = await fetchData(moulberryurl[2] + moulberryparam[1])
    }
  }
  if (lbin1dayData.status == 200) {
    dataCache.lbin1day = lbin1dayData.data
  }
  const shiiyubz = await fetchData('https://sky.shiiyu.moe/api/v2/bazaar')
  if (shiiyubz.status == 200) {
    dataCache.shiiyubz = shiiyubz.data
  }
  const hypixelbz = await fetchData('https://api.hypixel.net/skyblock/bazaar')
  if (hypixelbz.status == 200) {
    dataCache.hypixelbz = hypixelbz.data
  }
  save()
  setTimeout(() => {
    start()
  }, 60 * 1000)
}

function get(param) {
  return dataCache[param]
}

function save() {
  db.set("bzah", dataCache).then(() => {});
}

exports.start = start;
exports.get = get;