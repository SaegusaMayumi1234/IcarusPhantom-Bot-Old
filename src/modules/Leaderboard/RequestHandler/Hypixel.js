const axios = require('axios')

function getHypixelSkyblock(uuid, apikey) {
    return axios.get(`https://api.hypixel.net/skyblock/profiles?key=${apikey}&uuid=${uuid}`, {
        timeout: 10000
    }).then(skyblock => {
        let res = {
            status: 200,
            data: "none"
        }
        if (skyblock.data.profiles == null) {
            res.status = 404
            res.data = "No skyblock profile found"
        } else {
            res.status = 200
            res.data = skyblock.data.profiles
        }
        return res
    }).catch(error => {
        let res = {
            status: 502,
            data: "unknown error"
        }
        if (error.response !== undefined) {
            if (error.response.status == 429 || error.response.status == 400 || error.response.status == 403) {
                res.status = 403
                res.data = "apikey error"
            } else if (error.response.status == 404) {
                res.status = 404
                res.data = "No skyblock profile found"
            }
        } else if (error.code == "ECONNRESET" || error.code == "ETIMEDOUT" || error.code == "ECONNABORTED") {
            res.status = 500
            res.data = "connection error"
        }
        console.log("hypixel skyblock")
        console.log(error)
        return res
    })
}

//id = 5ecc8b948ea8c98d63a2936d

function getHypixelGuild(id, apikey) {
    return axios.get("https://api.hypixel.net/guild?key=" + apikey + "&id=" + id, {
        timeout: 10000
    }).then(guild => {
        let res = {
            status: 200,
            data: guild.data.guild.members
        }
        return res
    }).catch(error => {
        let res = {
            status: 502,
            data: "unknown error"
        }
        if (error.response !== undefined) {
            if (error.response.status == 429 || error.response.status == 400 || error.response.status == 403) {
                res.status = 403
                res.data = "apikey error"
            } else if (error.response.status == 404) {
                res.status = 404
                res.data = "No guild found"
            }
        } else if (error.code == "ECONNRESET" || error.code == "ETIMEDOUT" || error.code == "ECONNABORTED") {
            res.status = 500
            res.data = "connection error"
        }
        console.log("hypixel Guild")
        console.log(error)
        return res
    })
}

exports.getHypixelSkyblock = getHypixelSkyblock;
exports.getHypixelGuild = getHypixelGuild;