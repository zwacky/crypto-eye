import { AppBar, Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../../Context/CryptoContext';

const Header = () => {
  const navigate = useNavigate();

  const { currency, setCurrency } = CryptoState();
  // console.log(currency);
  
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark"
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position='static'>
        <Container >
          <Toolbar>
            <Typography variant="h6" onClick={() => navigate("/")}
              sx={{ flex: 1, color: "gold", fontFamily: "Montserrat", fontWeight: "bold", cursor: "pointer" }}>
              Crypto Eye
            </Typography>
            <Select variant="outlined"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              sx={{ width: "100px", height: "40px", }}>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
              <MenuItem value={"NGN"}>NGN</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header