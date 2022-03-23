const express = require('express');
const app = express();
const hypixelStatus = require('./hypixelStatus')
const apiKeyHandler = require('./apiKeyHandler')
const eventTimer = require('./hypixelEventTimer')
const eventTimer2 = require('./hypixelEventTimer2')
const bzahAPIHandler = require('./bzahAPIHandler')
const nwmaroHandler = require('./nwmaroHandler')
const auctionScrapperHandler = require('./AuctionScrapperHandler')

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.all('/', (req, res)=>{
  res.status(200).json({
    status: 200
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

app.get('/api/ca7c8e9b93094c82b15a3c51e8eaeba6/eventtimer2.json', async function (req, res) {
  let data = await eventTimer2.get()
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

app.get('/api/ca7c8e9b93094c82b15a3c51e8eaeba6/lbinskytils.json', async function (req, res) {
  let data = await bzahAPIHandler.get("lbinskytils")
  res.status(200).json({
    status: 200,
    data: data
  })
})

app.get('/api/networth/maro/:name', async function (req, res) {
  let data = await nwmaroHandler.getnwall(req.params.name)
  res.status(data.status).json(data)
})

app.get('/api/price/ready/lbin', async function (req, res) {
  auctionScrapperHandler.savelbin()
  res.status(200).json({status: 200, description: "will fetching data immediately"})
})

app.post('/api/price/ready/lbinname', async function (req, res) {
  auctionScrapperHandler.savelbinName(req.body)
  res.status(200).json({success: true})
  console.log("a post request from heroku completed!")
})

app.post('/api/price/ready/lbinid', async function (req, res) {
  auctionScrapperHandler.savelbinID(req.body)
  res.status(200).json({success: true})
  console.log("a post request from heroku completed!")
})


app.get('/api/price/auction/lbinname.json', async function (req, res) {
  let data = await auctionScrapperHandler.get("lbinName")
  data.status = 200
  res.status(200).json(data)
})

app.get('/api/price/auction/lbinid.json', async function (req, res) {
  let data = await auctionScrapperHandler.get("lbinID")
  data.status = 200
  res.status(200).json(data)
})

app.get('/api/ping/bot/:status', async function (req, res) {
  let data = await auctionScrapperHandler.get(req.params.status)
  data.status = 200
  res.status(200).json(data)
})

app.post('/api/ping/keepalive/:status', async function (req, res) {
  let data = await auctionScrapperHandler.get(req.params.status)
  data.status = 200
  res.status(200).json(data)
})

function keepAlive(){
  app.listen(3000, () => {
    console.log("Server is Ready!")
  });
}

module.exports = keepAlive;