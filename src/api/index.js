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

export const logFileByWeek = (date) => {
  const startDateOfWeek = date.startOf('week');
  return countLogFileByDay(startDateOfWeek, startDateOfWeek.clone().add('d', 6))
}

export const logFileByMonth = (date) => {
  const startDateOfMonth = date.clone().startOf('month')
  const endDateOfMonth = date.clone().endOf('month')
  return countLogFileByDay(startDateOfMonth, endDateOfMonth)
}

export const infoNetWorkByDay = (date) => {
  return axios.post(`http://gwfpt.digihcs.com:9200/metricbeat-2020.08.29-000001/_search?pretty`,
    {
      "query": {
        "bool": {
          "filter": [
            {
              "exists": {
                "field": "system.socket"
              }
            },
            {
              "range": {
                "@timestamp": {
                  "gte": date.toISOString(),
                  "lt": date.clone().add('d', 1).toISOString()
                }
              }
            }
          ]
        }
      },
      "size": 10000,
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

export const countLogFileByDay = (startDate, endDate) => {
  return axios.post(`http://gwfpt.digihcs.com:9200/logstash-fbjs38/_search?pretty=true&size=0`,
    {
      "query": {
        "range": {
          "@timestamp": {
            "gte": startDate.toISOString(),
            "lt": endDate.clone().add('d', 1).toISOString()
          }
        }
      },
      "aggs": {
        "count": {
          "value_count": {
            "field": "_index"
          }
        }
      }
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