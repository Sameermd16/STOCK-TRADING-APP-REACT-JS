import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { StockDetailPage } from './pages/StockDetailPage'
import { StockOverviewPage } from './pages/StockOverviewPage'
import { AppContextProvider } from './context/AppContext'

function App() {

  return (
    <main className='container'>
      <AppContextProvider>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={ <StockOverviewPage /> } />
              <Route path='/detail/:symbol' element={ <StockDetailPage /> } />
            </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </main>
  )
}

export default App
