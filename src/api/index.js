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
  return axios.all([
    logFileByDay(startDateOfWeek),
    logFileByDay(startDateOfWeek.clone().add('d', 1)),
    logFileByDay(startDateOfWeek.clone().add('d', 2)),
    logFileByDay(startDateOfWeek.clone().add('d', 3)),
    logFileByDay(startDateOfWeek.clone().add('d', 4)),
    logFileByDay(startDateOfWeek.clone().add('d', 5)),
    logFileByDay(startDateOfWeek.clone().add('d', 6)),
  ])
}

export const logFileByMonth = (date) => {
  const startDateOfMonth = date.clone().startOf('month')
  const endDateOfMonth = date.clone().endOf('month')
  const arrApi = []
  const indexDate = startDateOfMonth.clone();
  const ISOStringEndDate = endDateOfMonth.clone().add('d', 1).startOf('time').format('yyyy-MM-DD')
  while (indexDate.format('yyyy-MM-DD') !== ISOStringEndDate) {
    arrApi.push(logFileByDay(indexDate))
    indexDate.add('d', 1)
  }
  return axios.all(arrApi)
}