module.exports = {
  name: 'newembed',
  description: 'creating new embed!',
  execute(message, args, client) {
    const embedmsg = {
      "embed": {
        "title": `new embed`,
        "description": `new`,
        "color": "2F3136",
        "timestamp": new Date().getTime()
      }
    }
    message.channel.send(embedmsg)
  }
}