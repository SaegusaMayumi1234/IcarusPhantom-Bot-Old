function simplehumanizeTime(timestamp) {
  var time = timestamp / 1000
  if (time < 1) {
    time = 1
  }
  //const seconds = Math.floor(time >= 60 ? time % 60 : time)
  const minutes = Math.ceil((time = time / 60) >= 60 ? time % 60 : time)
  const hours = Math.floor((time = time / 60) >= 24 ? time % 24 : time)
  const days = Math.floor(time = time / 24)
  //const days = Math.floor((time = time / 24) >= 30 ? time % 30 : time)
  //const months = Math.floor((time = time / 30) >= 12 ? time % 12 : time)
  //const years = Math.floor(time / 12)

  let humanizedTime = []

  /*if (years > 0) {
    humanizedTime.push(`${years}y`)
  }
  if (months > 0) {
    humanizedTime.push(`${months}m`)
  }*/
  if (days > 0) {
    humanizedTime.push(`${days}d`)
  }
  if (hours > 0) {
    humanizedTime.push(`${hours}h`)
  }
  if (minutes > 0) {
    humanizedTime.push(`${minutes}m`)
  }
  //if (seconds > 0) {
  //  humanizedTime.push(`${seconds} seconds`)
  //}
  //if (humanizedTime.length < 2) {
  //  return humanizedTime.join(', ')
  //}
  //const lastElement = humanizedTime.pop()

  return humanizedTime.join(' ')
}

module.exports = simplehumanizeTime;