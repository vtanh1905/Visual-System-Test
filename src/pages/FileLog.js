import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { DatePicker } from 'antd';
import BarChart from '../components/BarChart'
import { logFileByDay } from '../api'
import axios from 'axios'

const { RangePicker } = DatePicker;

function FileLog() {
  const [data, setData] = useState(null)
  // const [typeDate, setTypeDate] = useState('day')
  const [startDate, setStartDate] = useState(moment('2020-08-29'))
  const [endDate, setEndDate] = useState(moment('2020-09-15'))

  useEffect(() => {
    if (startDate !== null) {
      const arrAPI = []
      const indexDate = startDate.clone();
      const ISOStringEndDate = endDate.clone().add('d', 1).toISOString()
      let tempData = [];
      while (indexDate.toISOString() !== ISOStringEndDate) {
        arrAPI.push(logFileByDay(indexDate))
        tempData.push({
          name: indexDate.format('DD/MM/yyyy')
        })
        indexDate.add('d', 1)
      }

      axios.all(arrAPI)
        .then(resAll => {
          resAll.forEach((item, index) => tempData[index].value = item.data.hits.total.value)
          setData(tempData);
        })


    }
  })
  // console.log(moment('2020-09-13', "YYYY-MM-DD").clone().day(1).toISOString());
  return (
    <div >
      {/* <Radio.Group value={typeDate} onChange={e => setTypeDate(e.target.value)}>
        <Radio value={'day'}>Day</Radio>
        <Radio value={'week'}>Week</Radio>
        <Radio value={'month'}>Month</Radio>
      </Radio.Group> */}
      <RangePicker
        defaultValue={[startDate, endDate]}
        ranges={[moment('2020-08-13'), moment()]}
        onChange={(x => {
          console.log(x)
          setStartDate(x[0])
          setEndDate(x[1])
        })} />

      {/* <RangePicker picker="week" onChange={(x, y) => {
        console.log(x)
        console.log(y)
      }} /> */}

      {data && <BarChart data={data} />}
    </div>
  )
}

export default FileLog
