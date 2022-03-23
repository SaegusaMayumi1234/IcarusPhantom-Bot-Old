const axios = require('axios')

async function getMaro(sbprofiles) {
    if (sbprofiles.length !== 0) {
        let proccesedNetworth = []
        let doneProccesing = 0
        for (const profile of sbprofiles) {
            let maro = await fetchMaro(profile)
            if (maro.status == 200) {
              let total = (maro.data.networth != null || maro.data.networth != undefined ? maro.data.networth : 0) + (maro.data.bank != null || maro.data.bank != undefined ? maro.data.bank : 0) + (maro.data.sacks != null || maro.data.sacks != undefined ? maro.data.sacks : 0) + (maro.data.purse != null || maro.data.purse != undefined ? maro.data.purse : 0)
                proccesedNetworth.push(total)
            } else if (maro.status == 404) {
                proccesedNetworth.push(0)
            } else if (maro.status == 500) {
                return {
                    status: 500,
                    data: "connection error"
                }
            } else if (maro.status == 502) {
                return {
                    status: 502,
                    data: "unknown error"
                }
            }
            doneProccesing += 1
            if (doneProccesing == sbprofiles.length) {
                return {
                    status: 200,
                    data: proccesedNetworth
                }
            }
        }
    } else {
        return {
            status: 200,
            data: [0]
        }
    }
    
}

function fetchMaro(sbprofile) {
    return axios.post("https://IcarusPhantom-API.saegusamayumi.repl.co/api/networth/categories", {
        data: sbprofile
    }).then(maro => {
        //console.log(maro.data)
        let res = {
            status: 200,
            data: maro.data.data
        }
        return res
    }).catch(error => {
        let res = {
            status: 502,
            data: "unknown error"
        }
        if (error.response !== undefined) {
            if (error.response.data.cause === "This player has their inventory API disabled.") {
                res.status = 404
                res.data = "invalid username"
            }
        } else if (error.code == "ECONNRESET" || error.code == "ETIMEDOUT" || error.code == "ECONNABORTED" || error.response.status == 520) {
            res.status = 500
            res.data = "connection error"
        }
        console.log("maro")
        console.log(error)
        return res
    })
}
//520: Unknown error
exports.getMaro = getMaro;