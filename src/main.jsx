import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
    // BrowserRouter->it helps to provide routing facilities to App
    // Toaster-> use for beautify the notification/popup
    <BrowserRouter> 
    <App />
    <Toaster/>
    </BrowserRouter>
  
)
