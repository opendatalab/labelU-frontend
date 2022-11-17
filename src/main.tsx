import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import store from './stores'
import './index.css'
import 'antd/dist/antd.css';
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/*<Provider store={ store }>*/}
        <App />
    {/*</Provider>*/}
  </React.StrictMode>
)
