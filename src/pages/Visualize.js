import React, { useEffect } from 'react'
import moment from 'moment'

import StackedChart from '../components/StackedChart'

import { infoNetWorkByDay } from '../api'

let data = [
  { name: "AL", "Under 5 Years": "552", "5 to 13 Years": "259" },
  { name: "AK", "Under 5 Years": "856", "5 to 13 Years": "421" },
  { name: "AZ", "Under 5 Years": "828", "5 to 13 Years": "362" },
  { name: "AR", "Under 5 Years": "343", "5 to 13 Years": "157" },
  { name: "CA", "Under 5 Years": "449", "5 to 13 Years": "215" },
  { name: "CO", "Under 5 Years": "587", "5 to 13 Years": "261" },
  { name: "CT", "Under 5 Years": "403", "5 to 13 Years": "196" },
  { name: "DE", "Under 5 Years": "794", "5 to 13 Years": "474" },
]

let keys = ["Under 5 Years", "5 to 13 Years"]

function Visualize() {

  useEffect(() => {
    infoNetWorkByDay(moment().add('d', '-1'))
      .then(res => console.log(res))
  })

  return (
    <div>
      <StackedChart keys={keys} data={data} />
    </div>
  )
}

export default Visualize
