import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
const APIURL = new URL('http://localhost:3001/api/');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

export default APIURL;