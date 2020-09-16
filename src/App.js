import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import routers from './configs/routers'

import 'antd/dist/antd.css';
function App() {
  return (
    <Router>
      <Switch>
        {routers.map((item) => (
          <Route exact={item.exact} path={item.path} key={item.path}>
            {item.component}
          </Route>
        ))}
      </Switch>
    </Router>
  )
}

export default App
