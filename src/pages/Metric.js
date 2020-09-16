import React, { useEffect, useState } from 'react'
import ProgressChart from '../components/ProgressChart/index'
const axios = require('axios');
// const { Client } = require('@elastic/elasticsearch')
function Metric() {
  const [data, setData] = useState({})
  const [load, setLoad] = useState({})
  const [cpu, setCpu] = useState({})
  const [memory, setMemory] = useState({})
  const [network, setNetwork] = useState({})
  const [fileSystem, setFileSystem] = useState({})
  const [processSum, setProcessSum] = useState({})

  useEffect(() => {
    let dataTemp = {}
    const getData = async () => {
      axios.get('http://gwfpt.digihcs.com:9200/metricbeat-2020.08.29-000001/_search?pretty',
        {
          auth: {
            username: 'cuong.phung',
            password: '12345678'
          }
        }
      ).then(function (response) {
        setData(response.data.hits.hits)
        dataTemp = response.data.hits.hits
        Object.keys(dataTemp).map(each => {
          (dataTemp[each]._source.event.dataset.slice(7) === "load" ?
            setLoad(dataTemp[each]._source.system.load) :
            dataTemp[each]._source.event.dataset.slice(7) === "cpu" ?
              setCpu(dataTemp[each]._source.system.cpu) :
              dataTemp[each]._source.event.dataset.slice(7) === "memory" ?
                setMemory(dataTemp[each]._source.system.memory) :
                dataTemp[each]._source.event.dataset.slice(7) === "network" ?
                  setNetwork(dataTemp[each]._source.system.network) :
                  dataTemp[each]._source.event.dataset.slice(7) === "filesystem" ?
                    setFileSystem(dataTemp[each]._source.system.filesystem || {}) :
                    setProcessSum(dataTemp[each]._source.system.process)
          )
        })
      }).catch(function (error) {
        console.log('Error on Authentication');
      });
    }
    getData()

  }, [])


  return (
    <div style={{ flexDirection: 'row', display: 'flex' }}>
      {console.log(cpu)}
      <ProgressChart
        pct={Math.floor((cpu.total === undefined ? 0 : cpu.total.pct) * 100)}
        name={'CPU'} cores={cpu.cores}/>

      <ProgressChart
        pct={Math.floor((memory.used === undefined ? 0 : memory.used.pct) * 100)}
        used={memory.used === undefined ? 0 : memory.used.bytes}
        free={memory.free}
        name={'MEMORY'} />
      <ProgressChart
        pct={Math.floor((fileSystem.used === undefined ? 0 : fileSystem.used.pct) * 100)}
        used={fileSystem.used === undefined ? 0 : fileSystem.used.bytes}
        free={fileSystem.free}
        name={'FILE SYSTEM'} />

    </div>
  )
}

export default Metric
