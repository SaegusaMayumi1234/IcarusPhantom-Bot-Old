const express = require('express');
const app = express();
const hypixelStatus = require('./hypixelStatus')
const apiKeyHandler = require('./apiKeyHandler')
const fragbotHandler = require('./fragbotHandler')

//const check 

app.all('/', (req, res)=>{
  res.status(200).json({
    status: 200
  })
})

app.param('id', function (req, res, next, value) {
  if (value == 'ca7c8e9b93094c82b15a3c51e8eaeba6') {
    next()
  } else {
    res.status(403).json({
      status: 403,
      error: "Your Request is forbidden"
    })
  }
})

app.get('/api/:id/fragbot.json', async function (req, res, next) {
  let fragbotData = await fragbotHandler.getAPI()
  res.status(200).json({
    status: 200,
    bot: fragbotData
  })
})

app.get('/api/:id/hypixelstatus.json', async function (req, res, next) {
    let data = await hypixelStatus.test()
    res.status(200).json({
      status: 200,
      bot: data
    })
})


app.get('/api/:id/apikey.json', async function (req, res) {
  let data = await apiKeyHandler.get()
  res.status(200).json({
    status: 200,
    apikey: data
  })
})

function keepAlive(){
  app.listen(3000, ()=>{console.log("Server is Ready!")});
}

module.exports = keepAlive;