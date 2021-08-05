const eventTimer2 = require("./hypixelEventTimer2")

const space = "​ ​ ​ ​ ​ ​ ​ ​ ​ ​ "

function start(client) {
  update(client)
  setInterval(() => {
    update(client)
  }, 60 * 1000)
}

function update(client) {
  //var eventTimerData = eventTimer2.get()
  client.channels.cache.get("872667648482230312").messages.fetch("872670638282772500")
    .then(msg => msg.edit({
      embed: {
        description: `This information will be updated every 30 seconds`,
        timestamp: new Date(),
        color: 'D400FF',
        author: {
          name: "Bot Status",
        },
        footer: {
          text: `Last Updated`
        },
        fields: [
          {
            "name": "SimpleFuturistic",
            "value": `Status:`
          },
          {
            "name": "IcarusPhantom",
            "value": `OnlineMode:`
          },
          {
            "name": "API Key",
            "value": `Status:`
          },
          {
            "name": "Stats",
            "value": `TrackingFor:`
          }
        ]
      },
    }))

  /*client.channels.cache.get("872667648482230312").messages.fetch("872670638282772500")
    .then(msg => msg.edit({
      "embed": {
        "title": "Cyclic SkyBlock events",
        "footer": {
          "text": `Last Updated`
        },
        "timestamp": new Date(),
        "fields": [
          {
            "name": ":ballot_box: Election begins",
            "value": `​6347537`
          },
          {
            "name": ":ballot_box: Election over",
            "value": `test`
          },
          {
            "name": ":lion: Traveling Zoo (Summer)",
            "value": `test`
          },
          {
            "name": ":ghost: Spooky Festival",
            "value": `test`
          },
          {
            "name": ":lion: Traveling Zoo (Winter)",
            "value": `test`
          },
          {
            "name": ":snowflake: Winter Island",
            "value": `test`
          },
          {
            "name": ":gift: Season of Jerry",
            "value": `test`
          },
          {
            "name": ":christmas_tree: New Year Celebration",
            "value": `test`
          }
        ]
      }
    }
  ))*/
}

exports.start = start;