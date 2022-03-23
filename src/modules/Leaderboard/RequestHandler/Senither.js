const axios = require('axios')

function getSenither(uuid, apikey) {
    return axios.get('https://hypixel-api.senither.com/v1/profiles/' + uuid + '/we?key=' + apikey, {
        timeout: 30000
    }).then(senither => {
        let res = {
            status: 200,
            data: senither.data
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
        console.log("senither")
        console.log(error)
        return res
    })
}

exports.getSenither = getSenither;