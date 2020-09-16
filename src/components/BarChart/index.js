import React, { useEffect } from 'react'
import './style.css'

import processDraw from './processDraw'

function BarChart(props) {
  const { title, data } = props

  useEffect(() => {
    processDraw(title, data)
  })

  return (
    <>
      <div id="BarChart" />
    </>
  )
}

export default BarChart