import { Box, LinearProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../../api/api'
import CoinInfo from '../../components/CoinPage/CoinInfo'
import Sidebar from '../../components/CoinPage/Sidebar'
import { CryptoState } from '../../Context/CryptoContext'


const CoinPage = () => {
  const { id } = useParams()
  const [coin, setCoin] = useState("")
  const { currency, symbol } = CryptoState()

  const fetchCoin = async () => {
    await fetch(SingleCoin(id))
      .then(res => res.json())
      .then(data => setCoin(data))
  }

  useEffect(() => {
    fetchCoin()
  }, [id])

  if (!coin) {
    // make sure coin is not empty so it doesn't fetch `undefined` with https://api.coingecko.com/...
    return <>loading</>
  }
  return (
    <Box sx={{
      display: "flex",
      // alignItems: "center",
      flexDirection: {
        xs: "column",
        sm: "column",
        md: "row"
      }
    }}>
      <Box sx={{ flex: 1, textAlign: "center" }}>
        {!coin ? <LinearProgress style={{ background: "gold" }} /> : <Sidebar coin={coin} />}
      </Box>
      <Box sx={{ flex: 3 }}>
        <CoinInfo coin={coin} />
      </Box>
    </Box>
  )
}

export default CoinPage