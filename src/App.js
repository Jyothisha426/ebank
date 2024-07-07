import {Switch, Route} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <div className="app-container">
    <Switch>
      <Route exact path="/ebank/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
