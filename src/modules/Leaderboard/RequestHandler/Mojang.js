const axios = require('axios')

function getMojang(uuid) {
    return axios.get("https://playerdb.co/api/player/minecraft/" + uuid, {
        timeout: 10000
    }).then(mojang => {
        let res = {
            status: 200,
            data: mojang.data
        }
        return res
    }).catch(error => {
        let res = {
            status: 502,
            data: "unknown error"
        }
        if (error.response !== undefined) {
            if (error.response.status == 404 || error.response.status == 400 || error.response.status == 500) {
                res.status = 404
                res.data = "invalid username"
            }
        } else if (error.code == "ECONNRESET" || error.code == "ETIMEDOUT" || error.code == "ECONNABORTED") {
            res.status = 500
            res.data = "connection error"
        }
        console.log("Mojang")
        console.log(error)
        return res
    })
}

exports.getMojang = getMojang;