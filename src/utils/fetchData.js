const axios = require('axios');

async function fetchData(url) {
  return axios.get(url, {
    timeout: 10000
  }).then(data => {
    return data
  })
  .catch(err => {
    console.error(err.name + ': ' + err.message)
    if (err.response !== undefined) {
      const errorlog = {
        status: err.response.status,
        statustext: err.response.statusText,
        url: err.response.config.url,
        method: err.response.config.method,
        data: err.response.data
      }
      console.log(errorlog)
      return err.response
    }
    const errnonresponse = {
      status: err.code !== undefined ? err.code : err.type,
      url: err.config.url,
      method: err.config.method
    }
    console.log(errnonresponse)
    return errnonresponse
  })
}

module.exports = fetchData;