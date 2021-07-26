const Database = require("@replit/database");
const Parser = require('rss-parser');

const parser = new Parser();
const db = new Database();

async function start(client) {
  const newData = await parser.parseURL('https://status.hypixel.net/history.rss')
  db.get("hypixelstatus").then(value => {
    let oldData = value
    db.set("hypixelstatus", newData).then(() => {});
    merge(oldData, newData, client)
  });
  setTimeout(() => {
    start(client)
  }, 10000)
}

async function test() {
  const newData = await parser.parseURL('https://status.hypixel.net/history.rss')
  return newData
}

function merge(oldData, newData, client) {
  if (oldData.items[0].content == newData.items[0].content && oldData.items[0].link == newData.items[0].link) return;
  const data1 = oldData.items[0]
  const data2 = newData.items[0]
  const parts1 = data1.content.replace("\n", "").split("</p>").reverse()
  const parts2 = data2.content.replace("\n", "").split("</p>").reverse()
  let mergeArray = []
  parts2.forEach(item => {
    if (data1.link == data2.link) {
      if (parts1.includes(item)) return;
      if (item == '      ') return;
      mergeArray.push(item)
    } else {
      if (item == '      ') return;
      mergeArray.push(item)
    }
  })
  mergeArray.forEach(item => {
    let desc = item.replace(/<\/?(?:var|strong|p|small).*?>/g, "").split(/<\/?br.*?>/g)
    let date = `**${desc.shift()}**`
    let msg = `${date}\n${desc.join("\n")}`
    
    client.channels.cache.get('828075952285679658').send({
      embed: {
        title: data2.title,
        description: msg,
        timestamp: new Date(),
        color: 'FF4D00',
        url: data2.link,
        footer: {
          text: `Last Updated`
        }
      },
    })
  })
}

exports.start = start;
exports.test = test;