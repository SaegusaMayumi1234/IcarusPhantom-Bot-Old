const express = require('express');
const app = express();
const hypixelStatus = require('./hypixelStatus')
const apiKeyHandler = require('./apiKeyHandler')
const fragbotHandler = require('./fragbotHandler')
const eventTimer = require('./hypixelEventTimer')
const bzahAPIHandler = require('./bzahAPIHandler')

app.all('/', (req, res)=>{
  res.status(200).json({
    status: 200
  })
})

app.get('/api/ca7c8e9b93094c82b15a3c51e8eaeba6/fragbot.json', async function (req, res) {
  let fragbotData = await fragbotHandler.getAPI()
  res.status(200).json({
    status: 200,
    bot: fragbotData
  })
})

app.get('/api/ca7c8e9b93094c82b15a3c51e8eaeba6/hypixelstatus.json', async function (req, res) {
    let data = await hypixelStatus.test()
    res.status(200).json({
      status: 200,
      bot: data
    })
})

app.get('/api/ca7c8e9b93094c82b15a3c51e8eaeba6/apikey.json', async function (req, res) {
  let data = await apiKeyHandler.get()
  res.status(200).json({
    status: 200,
    apikey: data
  })
})

app.get('/api/ca7c8e9b93094c82b15a3c51e8eaeba6/eventtimer.json', async function (req, res) {
  let data = await eventTimer.get()
  res.status(200).json({
    status: 200,
    eventTimer: data
  })
})

app.get('/api/ca7c8e9b93094c82b15a3c51e8eaeba6/lbin.json', async function (req, res) {
  let data = await bzahAPIHandler.get("lbin")
  res.status(200).json({
    status: 200,
    data: data
  })
})

app.get('/api/ca7c8e9b93094c82b15a3c51e8eaeba6/lbin1day.json', async function (req, res) {
  let data = await bzahAPIHandler.get("lbin1day")
  res.status(200).json({
    status: 200,
    data: data
  })
})

app.get('/api/ca7c8e9b93094c82b15a3c51e8eaeba6/shiiyubz.json', async function (req, res) {
  let data = await bzahAPIHandler.get("shiiyubz")
  res.status(200).json({
    status: 200,
    data: data
  })
})

app.get('/api/ca7c8e9b93094c82b15a3c51e8eaeba6/hypixelbz.json', async function (req, res) {
  let data = await bzahAPIHandler.get("hypixelbz")
  res.status(200).json({
    status: 200,
    data: data
  })
})

function keepAlive(){
  app.listen(3000, () => {
    console.log("Server is Ready!")
  });
}

module.exports = keepAlive;