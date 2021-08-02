const bot1 = require('./src/core/DiscordManager1')
const bot2 = require('./src/core/DiscordManager2')
const keepAlive = require('./src/modules/server');

bot1.connect()
bot2.connect()
keepAlive()