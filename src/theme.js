import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main:  '#4caf50',  
    },
    secondary: {
      main: '#ff9800',
    },
  },
  typography: {
    fontFamily: "'NoonnuBasicGothicRegular'",
  },
});

export default theme;