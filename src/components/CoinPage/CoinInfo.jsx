import { Box, CircularProgress, createTheme, ThemeProvider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { HistoricalChart } from '../../api/api'
import { CryptoState } from '../../Context/CryptoContext'

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState([])
  const [loading, setLoading] = useState(false)
  const [days, setDays] = useState(1)

  const { symbol, currency } = CryptoState()

  const fectchHistoricalData = async () => {
    setLoading(true)
    await fetch(HistoricalChart(coin.id, days, currency))
      .then(res => res.json())
      .then(data => {
        setHistoricData(data?.prices)
      })
    setLoading(false)
  }

  useEffect(() => {
    fectchHistoricalData()
  }, [])

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark"
    },
  });

  console.log(historicData);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}>
        {loading ?
          (<CircularProgress
            style={{
              color: "gold",
            }}
            size={250}
            thickness={1}
          />
          ) : (
            <>
              okfdh
              {/* <Line
                data={{
                  labels: historicData.map(coin => {
                    let date = new Date(coin[0])
                    let time = date.getHours() > 12
                      ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
                      : `${date.getHours()} : ${date.getMinutes()} AM`
                    return days === 1 ? time : date.toLocaleDateString()
                  }),
                  datasets: [
                    {
                      data: historicData.map(coin => coin[1]),
                      label: `Price (Past ${days} Days) in ${currency}`,
                      borderColor: "#eebc1d"
                    },
                  ]
                }}
              /> */}
            </>
          )}
      </Box>
    </ThemeProvider>
  )
}

export default CoinInfo