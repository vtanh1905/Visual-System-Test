import React from 'react'
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <button onClick={() => history.push('metric')}>1.Metric</button>
        <button onClick={() => history.push('filelog')}>2.File Log</button>
        <button>3.Visualize</button>
        <button>4.Top Error</button>
      </div>
    </div>
  )
}

export default Home
