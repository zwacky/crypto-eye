import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../../api/api'
import { CryptoState } from '../../Context/CryptoContext'

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';

const Carousel = () => {
  const [trending, setTrending] = useState([])
  const { currency, symbol } = CryptoState()
  const fetchTrendingCoins = async () => {
    await fetch(TrendingCoins(currency))
      .then(res => res.json())
      .then(data => setTrending(data));
  }

  // console.log(trending);

  useEffect(() => {
    fetchTrendingCoins()
  }, [currency]);



  const items = trending.map(coin => {
    // Number with commas
    function separator(numb) {
      var str = numb.toString().split(".");
      str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return str.join(".");
    }

    // Calculate the profit
    let profit = coin.price_change_percentage_24h >= 0

    return (
      <Link Link to={`/coins/${coin.id}`}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", textTransform: "uppercase" }}>
          <img src={coin?.image} alt={coin.name} height="60" style={{ marginBottom: 10 }} />
          <span>
            {coin?.symbol}
            &nbsp;
            <span style={{ color: profit ? "lightgreen" : "red", fontWeight: 500 }}>{profit && "+"}{coin.price_change_percentage_24h?.toFixed(2)}%</span>
          </span>

          <span style={{ fontSize: "1rem", fontWeight: 500 }}>{symbol} {separator(coin?.current_price.toFixed(2))}</span>
        </Box>
      </Link >
    )
  })

  const responsive = {
    0: {
      items: 2
    },
    512: {
      items: 4
    },
  };


  return (
    <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", }}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </Box>
  )
}

export default Carousel