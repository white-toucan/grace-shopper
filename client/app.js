import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <div id="container">
        <Routes />
      </div>
    </div>
  )
}

export default App
