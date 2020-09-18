import React, { useEffect } from 'react'

import processDraw from './processDraw'

function StackedChart(props) {
  const { keys, data } = props
  useEffect(() => {
    processDraw(keys, data)
  })

  return (
    <div >
      <svg id="chart" style={{ width: '100%', height: 800 }}></svg>
    </div>
  )
}

export default StackedChart
