import { Box, Container, createTheme, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CoinList } from '../../api/api'
import { CryptoState } from '../../Context/CryptoContext'

const CoinsTable = () => {
  const navigate = useNavigate()

  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const { currency, symbol } = CryptoState()

  const fetechCoins = async () => {
    // setLoading(true)
    await fetch(CoinList(currency))
      .then(res => res.json())
      .then(data => setCoins(data))
    // setLoading(false)
  }

  useEffect(() => {
    fetechCoins()
  }, [currency])

  console.log(coins)

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark"
    },
  });

  const handleSearch = () => {
    return coins.filter(coin => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search))
  }

  // Number with commas
  function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
  }


  return (
    <ThemeProvider theme={darkTheme}>
      <Container align="center">
        <Typography variant='h4' my={3}>Crypto Price by Market Cap</Typography>
        <TextField
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: "30px" }}
          variant='outlined' label="Search for cryptocurrencies" fullWidth />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ background: "gold" }} />
          ) : (
            <Table>
              <TableHead sx={{ background: "#eebc1d" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map(head => (
                    <TableCell
                      key={head}
                      sx={{ fontWeight: 700, color: "#000" }}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map(coinRow => {
                    const profit = coinRow.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        key={coinRow.name}
                        onClick={() => navigate(`/coins/${coinRow.id}`)}
                        sx={{
                          background: "#16171a",
                          cursor: "pointer",
                          "&:hover": {
                            background: "#131111"
                          }
                        }}
                      >
                        <TableCell component="th" scope='row'
                          sx={{ display: "flex", gap: 2 }}
                        >
                          <img src={coinRow?.image} alt={coinRow.name} height="40" />
                          <Box
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 18,
                              }}
                            >
                              {coinRow.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {coinRow.name}
                            </span>
                          </Box>
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          {symbol} {separator(coinRow?.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"} {coinRow.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol} {" "}
                          {separator(coinRow?.market_cap.toFixed(0))}
                          {/* {separator(
                          coinRow.market_cap.toString().slice(0, -6)
                        )} */}
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          fullWidth
          sx={{
            padding: 5,
            "& .MuiPaginationItem-root": { color: "gold" },
            display: "flex", justifyContent: "center", alignItems: "center"
          }}
          count={Math.ceil(handleSearch().length / 10)}
          onChange={(_, value) => {
            setPage(value)
            window.scroll(0, 450)
          }}
        />
      </Container>
    </ThemeProvider>
  )
}

export default CoinsTable