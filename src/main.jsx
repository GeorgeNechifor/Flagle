import React from 'react'
import ReactDOM from 'react-dom/client'

import { App }from './App.jsx';
import {Navigation} from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navigation></Navigation>
    <App></App>
  </React.StrictMode>,
)
