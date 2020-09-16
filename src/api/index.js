import axios from 'axios'

const username = process.env.REACT_APP_USERNAME_API
const password = process.env.REACT_APP_PASSWORLD_API

/*
  date : moment 
*/
export const logFileByDay = (date) => {
  return axios.post(`http://gwfpt.digihcs.com:9200/logstash-fbjs38/_search?pretty`,
    {
      "query": {
        "range": {
          "@timestamp": {
            "gte": date.toISOString(),
            "lt": date.clone().add('d', 1).toISOString()
          }
        }
      },
      "size": 1000,
      "sort": [
        {
          "@timestamp": {
            "order": "asc"
          }
        }
      ]
    }
    , {
      headers: {
        'Content-Type': 'application/json'
      },
      auth: {
        username,
        password
      },
    })
}