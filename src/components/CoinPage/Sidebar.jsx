import { Typography } from '@mui/material'
import React from 'react'
import parse from 'html-react-parser';
import { Box } from '@mui/system';
import { CryptoState } from '../../Context/CryptoContext';


const Sidebar = ({ coin }) => {
  // Number with commas
  function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
  }

  const { symbol, currency } = CryptoState()

  return (
    <>
      <img src={coin?.image?.large} alt={coin?.name} height="200" />
      <Typography variant='h4' mt={2}>{coin?.name}</Typography>
      <Typography variant='body1' p={2}>
        {parse(`${coin?.description?.en.split(". ")[0]}`)}
      </Typography>
      <Box>
        <Typography variant='h5' mt={2}>
          <span style={{ fontWeight: "bold" }}>Rank:</span>
          {coin?.market_cap_rank}
        </Typography>
        <Typography variant='h6' mt={2}>
          <span style={{ fontWeight: "bold" }}>Current Price: </span>
          {symbol}
          {separator(coin?.market_data.current_price[currency.toLowerCase()])}
        </Typography>
        <Typography variant='h6' mt={2}>
          <span style={{ fontWeight: "bold" }}>Market Cap: </span>
          {symbol}
          {separator(coin?.market_data.market_cap[currency.toLowerCase()].toFixed(0))}
        </Typography>
      </Box>

    </>
  )
}

export default Sidebar