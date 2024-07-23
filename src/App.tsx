import { BrowserRouter } from 'react-router-dom'

import { Routes } from './Router'

import '@/styles/global.css'

export function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
}
