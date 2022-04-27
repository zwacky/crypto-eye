import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import Img from '../../../public/photo-1516789349110-e9265a848369.avif'
import Carousel from './Carousel'

const Banner = () => {
  return (
    <Box sx={{
      background: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${Img})`, height: "400px",
    }}>
      <Container>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around", textAlign: "center" }}>
          <Typography my={5} variant="h2" sx={{ fontWeight: 'bold', fontFamily: "Montserrat", color: "gold" }}>Crypto Eye</Typography>
          <Typography mb={5} variant="h6">Latest update on crypto currencies</Typography>
        </Box>
        <Carousel />
      </Container>
    </Box >
  )
}

export default Banner