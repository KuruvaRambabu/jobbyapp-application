import {Switch, Route} from 'react-router-dom'
import {observer} from 'mobx-react'

import './App.css'
import Login from './component/Login'
import ProtectedRoute from './component/ProtectedRoute'
import Home from './component/Home'
import Jobs from './component/Jobs'
import JobDetails from './component/JobItemDetails'
import NotFound from './component/NotFound'

import stores from './stores/index'
import StoresContext from './component/context/storeContext'

const {loginStore, jobStore} = stores

const App = observer(() => (
  <Switch>
    <StoresContext.Provider value={{loginStore, jobStore}}>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
      <Route component={NotFound} />
    </StoresContext.Provider>
  </Switch>
))

export default App
