import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import * as serviceWorker from './serviceWorker'

import MainWrapper from './App'

ReactDOM.render(<MainWrapper />, document.getElementById('root'))

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
