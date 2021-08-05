const eventTimer2 = require("./hypixelEventTimer2")
const simplehumanizeTime = require("../utils/simpleHumanizeTime")

const space = "​ ​ ​ ​ ​ ​ ​ ​ ​ ​ "

function start(client) {
  setInterval(() => {
    update(client)
  }, 30 * 1000)
}

const getOrdinalNum = (number) => {
  let selector;

  if (number <= 0) {
    selector = 4;
  } else if ((number > 3 && number < 21) || number % 10 > 3) {
    selector = 0;
  } else {
    selector = number % 10;
  }

  return number + ['th', 'st', 'nd', 'rd', ''][selector];
};

function update(client) {
  let now = new Date().getTime()
  var eventTimerData = eventTimer2.get()

  let boothopenelection = getOrdinalNum(eventTimerData["election-booth"].open.election)
  let boothopen = `booth opens ${simplehumanizeTime(eventTimerData["election-booth"].open.at - now)} (<t:${eventTimerData["election-booth"].open.at / 1000}:t>)`
  let boothopenspecial = `next special mayor: ${getOrdinalNum(eventTimerData["election-booth"].open.specialelection)} election ${simplehumanizeTime(eventTimerData["election-booth"].open.special - now)} (<t:${eventTimerData["election-booth"].open.special / 1000}:t>)`
  if (eventTimerData["election-booth"].open.at == eventTimerData["election-booth"].open.special) {
    boothopenspecial = `next special mayor: :arrow_up:`
  }

  let boothcloseelection = getOrdinalNum(eventTimerData["election-booth"].close.election)
  let boothclose = `mayor selected ${simplehumanizeTime(eventTimerData["election-booth"].close.at - now)} (<t:${eventTimerData["election-booth"].close.at / 1000}:t>)`
  let boothclosespecial = `next special mayor: ${getOrdinalNum(eventTimerData["election-booth"].close.specialelection)} election ${simplehumanizeTime(eventTimerData["election-booth"].close.special - now)} (<t:${eventTimerData["election-booth"].close.special / 1000}:t>)`
  if (eventTimerData["election-booth"].close.at == eventTimerData["election-booth"].close.special) {
    boothclosespecial = `next special mayor: :arrow_up:`
  }

  let travelingzoosummer = (eventTimerData["travelling-zoo"].summer.end - now) > 0 && (eventTimerData["travelling-zoo"].summer.end - now) < 3600000 ? `closes ${simplehumanizeTime(eventTimerData["travelling-zoo"].summer.end - now)} (<t:${eventTimerData["travelling-zoo"].summer.end / 1000}:t>)` : `opens ${simplehumanizeTime(eventTimerData["travelling-zoo"].summer.start - now)} (<t:${eventTimerData["travelling-zoo"].summer.start / 1000}:t>)`
  let travelingzoosummerpets = `Legendary pet: ${eventTimerData["travelling-zoo"].summer.pets}`
  let petemoji1 = `:${(eventTimerData["travelling-zoo"].summer.pets == "Blue Whale" ? "Whale" : eventTimerData["travelling-zoo"].summer.pets).toLowerCase()}:`

  let travelingzoowinter = (eventTimerData["travelling-zoo"].winter.end - now) > 0 && (eventTimerData["travelling-zoo"].winter.end - now) < 3600000 ? `closes ${simplehumanizeTime(eventTimerData["travelling-zoo"].winter.end - now)} (<t:${eventTimerData["travelling-zoo"].winter.end / 1000}:t>)` : `opens ${simplehumanizeTime(eventTimerData["travelling-zoo"].winter.start - now)} (<t:${eventTimerData["travelling-zoo"].winter.start / 1000}:t>)`
  let travelingzoowinterpets = `Legendary pet: ${eventTimerData["travelling-zoo"].winter.pets}`
  let petemoji2 = `:${(eventTimerData["travelling-zoo"].winter.pets).toLowerCase()}:`

  let festival = getOrdinalNum(eventTimerData["spooky-festival"].event.festival)
  let spookyfestival = (eventTimerData["spooky-festival"].event.end - now) > 0 && (eventTimerData["spooky-festival"].event.end - now) < 3600000 ? `ends ${simplehumanizeTime(eventTimerData["spooky-festival"].event.end - now)} (<t:${eventTimerData["spooky-festival"].event.end / 1000}:t>)` : `starts ${simplehumanizeTime(eventTimerData["spooky-festival"].event.start - now)} (<t:${eventTimerData["spooky-festival"].event.start / 1000}:t>)`

  let spookyfishing = (eventTimerData["spooky-festival"].fishing.end - now) > 0 && (eventTimerData["spooky-festival"].fishing.end - now) < 10800000 ? `ends ${simplehumanizeTime(eventTimerData["spooky-festival"].fishing.end - now)} (<t:${eventTimerData["spooky-festival"].fishing.end / 1000}:t>)` : `starts ${simplehumanizeTime(eventTimerData["spooky-festival"].fishing.start - now)} (<t:${eventTimerData["spooky-festival"].fishing.start / 1000}:t>)`

  let winterisland = (eventTimerData["jerry's-workshop"]["winter-island"].end - now) > 0 && (eventTimerData["jerry's-workshop"]["winter-island"].end - now) < 36000000 ? `closes ${simplehumanizeTime(eventTimerData["jerry's-workshop"]["winter-island"].end - now)} (<t:${eventTimerData["jerry's-workshop"]["winter-island"].end / 1000}:t>)` : `opens ${simplehumanizeTime(eventTimerData["jerry's-workshop"]["winter-island"].start - now)} (<t:${eventTimerData["jerry's-workshop"]["winter-island"].start / 1000}:t>)`

  let season = getOrdinalNum(eventTimerData["jerry's-workshop"]["season-of-jerry"].season)
  let seasonofjerry = (eventTimerData["jerry's-workshop"]["season-of-jerry"].end - now) > 0 && (eventTimerData["jerry's-workshop"]["season-of-jerry"].end - now) < 3600000 ? `ends ${simplehumanizeTime(eventTimerData["jerry's-workshop"]["season-of-jerry"].end - now)} (<t:${eventTimerData["jerry's-workshop"]["season-of-jerry"].end / 1000}:t>)` : `starts ${simplehumanizeTime(eventTimerData["jerry's-workshop"]["season-of-jerry"].start - now)} (<t:${eventTimerData["jerry's-workshop"]["season-of-jerry"].start / 1000}:t>)`

  let celebration = getOrdinalNum(eventTimerData["new-year-celebration"].celebration)
  let newyearcelebration = (eventTimerData["new-year-celebration"].end - now) > 0 && (eventTimerData["new-year-celebration"].end - now) < 3600000 ? `ends ${simplehumanizeTime(eventTimerData["new-year-celebration"].end - now)} (<t:${eventTimerData["new-year-celebration"].end / 1000}:t>)` : `starts ${simplehumanizeTime(eventTimerData["new-year-celebration"].start - now)} (<t:${eventTimerData["new-year-celebration"].start / 1000}:t>)`

  let bankinterest = `starts ${simplehumanizeTime(eventTimerData.bankinterest.start - now)} (<t:${eventTimerData.bankinterest.start / 1000}:t>)`

  let experimenttabledaily = `resets in ${simplehumanizeTime(eventTimerData.experimenttable.start - now)} (daily at <t:${eventTimerData.experimenttable.start / 1000}:t>)`

  let commissionsdaily = `resets in ${simplehumanizeTime(eventTimerData.commissions.start - now)} (daily at <t:${eventTimerData.commissions.start / 1000}:t>)`

  let fetchurdaily = `resets in ${simplehumanizeTime(eventTimerData.fetchur.start - now)} (daily at <t:${eventTimerData.fetchur.start / 1000}:t>)`

  let darkauctionhourly = `starts ${simplehumanizeTime(eventTimerData.darkauction.start - now)} (<t:${eventTimerData.darkauction.start / 1000}:t>)`

  let jacobhourly = (eventTimerData.jacob.end - now) > 0 && (eventTimerData.jacob.end - now) < 1200000 ? `ends ${simplehumanizeTime(eventTimerData.jacob.end - now)} (<t:${eventTimerData.jacob.end / 1000}:t>)` : `starts ${simplehumanizeTime(eventTimerData.jacob.start - now)} (<t:${eventTimerData.jacob.start / 1000}:t>)`

  client.channels.cache.get("872667648482230312").messages.fetch("872691413022806048")
    .then(msg => msg.edit({
      "embed": {
        "title": "Cyclic SkyBlock events",
        "footer": {
          "text": `Last Updated`
        },
        "color": '000000',
        "timestamp": new Date(),
        "fields": [
          {
            "name": `:ballot_box: ${boothopenelection} Election begins`,
            "value": `${space}${boothopen}\n${space}${boothopenspecial}`
          },
          {
            "name": `:ballot_box: ${boothcloseelection} Election over`,
            "value": `${space}${boothclose}\n${space}${boothclosespecial}`
          },
          {
            "name": `${petemoji1} Traveling Zoo (Summer)`,
            "value": `${space}${travelingzoosummer}\n${space}${travelingzoosummerpets}`
          },
          {
            "name": `${petemoji2} Traveling Zoo (Winter)`,
            "value": `${space}${travelingzoowinter}\n${space}${travelingzoowinterpets}`
          },
          {
            "name": `:ghost: ${festival} Spooky Festival`,
            "value": `${space}${spookyfestival}`
          },
          {
            "name": ":ghost: Spooky Fishing",
            "value": `${space}${spookyfishing}`
          },
          {
            "name": ":snowflake: Winter Island",
            "value": `${space}${winterisland}`
          },
          {
            "name": `:gift: ${season} Season of Jerry`,
            "value": `${space}${seasonofjerry}`
          },
          {
            "name": `:christmas_tree: ${celebration} New Year Celebration`,
            "value": `${space}${newyearcelebration}`
          },
          {
            "name": `:bank: Bank Interest`,
            "value": `${space}${bankinterest}`
          }
        ]
      }
    }
  ))
  client.channels.cache.get("872667648482230312").messages.fetch("872848087062818866")
    .then(msg => msg.edit({
      "embed": {
        "title": "Daily resetting SkyBlock events",
        "footer": {
          "text": `Last Updated`
        },
        "color": '000000',
        "timestamp": new Date(),
        "fields": [
          {
            "name": `:man_mage: Experimentation Table`,
            "value": `${space}${experimenttabledaily}`
          },
          {
            "name": `:clipboard: Dwarven Mines: Commissions bonus exp`,
            "value": `${space}${commissionsdaily}`
          },
          {
            "name": `:package: Dwarven Mines: Fetchur`,
            "value": `${space}${fetchurdaily}`
          }
        ]
      }
    }
  ))
  client.channels.cache.get("872667648482230312").messages.fetch("872857230041559041")
    .then(msg => msg.edit({
      "embed": {
        "title": "Hourly SkyBlock events",
        "footer": {
          "text": `Last Updated`
        },
        "color": '000000',
        "timestamp": new Date(),
        "fields": [
          {
            "name": `:coin: Dark Auction`,
            "value": `${space}${darkauctionhourly}`
          },
          {
            "name": `:farmer: Jacob Farming Contest`,
            "value": `${space}${jacobhourly}`
          }
        ]
      }
    }
  ))
  client.channels.cache.get("872667648482230312").messages.fetch("872861901460217917")
    .then(msg => msg.edit({
      "embed": {
        "title": "Special SkyBlock events",
        "footer": {
          "text": `Last Updated`
        },
        "color": '000000',
        "timestamp": new Date(),
        "fields": [
          {
            "name": `:fishing_pole_and_fish: Fishing Festival`,
            "value": `${space}Under development!`
          },
          {
            "name": `:pick: Mining Fiesta`,
            "value": `${space}Under development!`
          }
        ]
      }
    }
  ))
}

exports.start = start;