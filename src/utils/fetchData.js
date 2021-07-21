const axios = require('axios');

async function fetchData(url) {
  return axios.get(url, {
    timeout: 10000
  }).then(data => {
    return data
  })
  .catch(err => {
    console.log(err.response)
    return err.response
  })
}

module.exports = fetchData;