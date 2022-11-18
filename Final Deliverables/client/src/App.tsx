import { Heading } from '@chakra-ui/react';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authenticate from './pages/authenticate/Authenticate';
import Dashboard from './pages/dashboard/Dashboard';
import PrivateRoute from './utils/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route path="/authenticate" element={<Authenticate />} />
      </Routes>
    </Router>
  )
}

export default App;