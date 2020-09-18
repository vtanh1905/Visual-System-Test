import React, { useState } from 'react'
import moment from 'moment'
import { DatePicker, Radio } from 'antd';
import BarChart from '../components/BarChart'
import { logFileByDay, logFileByWeek, logFileByMonth, logFileByDayV2 } from '../api'
import axios from 'axios'

const { RangePicker } = DatePicker;

function FileLog() {
  const [data, setData] = useState(null)
  const [typeDate, setTypeDate] = useState('month')

  const handleSelectDate = (date) => {
    let startDate = date[0]
    let endDate = date[1]
    if (typeDate === 'day') {
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
          resAll.forEach((item, index) => tempData[index].value = item.data.aggregations.count.value)
          setData(tempData);
        })
    } else if (typeDate === 'week') {
      const arrAPI = []
      const indexDate = startDate.clone().startOf('week');
      const ISOStringEndDate = endDate.clone().startOf('week').add('w', 1).toISOString()
      let tempData = [];
      while (indexDate.toISOString() !== ISOStringEndDate) {
        arrAPI.push(logFileByWeek(indexDate))
        tempData.push({
          name: indexDate.format('yyyy-ww') + "th"
        })
        indexDate.add('w', 1)
      }
      axios.all(arrAPI)
        .then(resAll => {
          resAll.forEach((item, index) => tempData[index].value = item.data.aggregations.count.value)
          setData(tempData);
        })
    } else {
      const arrAPI = []
      const indexDate = startDate.clone().startOf('month');
      const stringEndDate = endDate.clone().startOf('month').add('month', 1).format('yyyy-MM')
      let tempData = [];
      while (indexDate.format('yyyy-MM') !== stringEndDate) {
        arrAPI.push(logFileByMonth(indexDate))
        tempData.push({
          name: indexDate.format('yyyy-MM')
        })
        indexDate.add('month', 1)
      }
      axios.all(arrAPI)
        .then(resAll => {
          resAll.forEach((item, index) => tempData[index].value = item.data.aggregations.count.value)
          setData(tempData);
        })
    }
  }

  return (
    <div >
      <Radio.Group value={typeDate} onChange={e => setTypeDate(e.target.value)}>
        <Radio value={'day'}>Day</Radio>
        <Radio value={'week'}>Week</Radio>
        <Radio value={'month'}>Month</Radio>
      </Radio.Group>
      {typeDate === 'day' &&
        <RangePicker
          onChange={handleSelectDate} />
      }
      {typeDate === 'week' &&
        <RangePicker picker="week" onChange={handleSelectDate} />
      }

      {typeDate === 'month' &&
        <RangePicker picker="month" onChange={handleSelectDate} />
      }




      {data && <BarChart data={data} />}
    </div>
  )
}

export default FileLog
