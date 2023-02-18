import {Routes, Route} from 'react-router-dom'
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
  <StoresContext.Provider value={{loginStore, jobStore}}>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
    </Routes>
  </StoresContext.Provider>
))

export default App
