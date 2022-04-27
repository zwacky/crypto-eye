import React from 'react';
import { Routes, Route } from "react-router-dom"
import { Coin, Home } from './Pages';
import { Header } from './components';
import { Box } from "@mui/material"


function App() {

  return (
    <Box sx={{ background: "#14161a", color: "#fff", minHeight: "100vh" }}>
      <Header />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/coins/:id" element={<Coin />} />
      </Routes>
    </Box>
  )
}

export default App
