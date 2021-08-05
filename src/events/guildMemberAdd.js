const Discord = require('discord.js')
const {registerFont} = require('canvas')
registerFont('./src/lib/font/sans-serif.ttf', { family: 'sans-serif' })
const Canvas = require('canvas')
const db = require('../modules/DatabaseManager')

var welcomeImage = 1

db.get("welcomeImage").then(value => {
  if (value === null) {
    db.set("welcomeImage", welcomeImage)
  } else if (value !== null) {
    welcomeImage = value
  }
});

module.exports = {
	name: 'guildMemberAdd',
	async execute(member, client) {
    const channel = member.guild.channels.cache.find(ch => ch.id === '772744864717996055');
	  if (!channel) return;
    if (welcomeImage >= 6) {
      welcomeImage = 1
    } else {
      welcomeImage += 1
    }
    db.set("welcomeImage", welcomeImage)
    const canvas = Canvas.createCanvas(1024, 500);
    const context = canvas.getContext('2d');

    const background = await Canvas.loadImage(`./src/lib/welcomeimage/Untitled-${welcomeImage}.png`);
    context.drawImage(background, 0, 0, 1024, 500);

    context.font = 'bolder 72px "sans-serif"';
    context.fillStyle = '#ffffff';
    context.fillText(`Welcome`, 360, 360);

    context.beginPath()
    context.arc(512, 166, 128, 0, Math.PI * 2, true)
    context.stroke()
    context.fill()

    context.font = 'bolder 42px "sans-serif"'
    context.textAlign = 'center'
    context.fillText(member.user.tag, 512, 410)

    context.font = 'bolder 32px "sans-serif"'
    context.fillStyle = '#ffffff';
    context.textAlign = 'center'
    context.fillText(`You are the ${member.guild.memberCount}th member`, 512, 455)

    context.beginPath();
    context.arc(512, 166, 120, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: 'png', size: 1024}));
    context.drawImage(avatar, 393, 47, 238, 238);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

    channel.send({ 
      "content": `Welcome to ${member.guild.name}, ${member}!`, 
      "files": [attachment],
      "embed": {
        "title": `Hello ${member.displayName}!`,
        "description": `Make sure to read <#772756456356446229> and check out <#772838593890746368>\nEnjoy your stay here!`,
        "color": "2F3136",
        "image": {
          "url": 'attachment://welcome-image.png'
        }
      }
    });
	},
};