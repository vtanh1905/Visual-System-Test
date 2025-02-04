import React from 'react'
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <button onClick={() => history.push('metric')}>1.Metric</button>
        <button onClick={() => history.push('filelog')}>2.File Log</button>
        <button onClick={() => history.push('visualize')}>3.Visualize</button>
        <button onClick={() => history.push('toperror')}>4.Top Error</button>
      </div>
    </div>
  )
}

export default Home
