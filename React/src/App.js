import logo from './logo.svg';
import './App.css';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CustomButton from './components/CustomButton';
import NavigationBar from './components/NavigationBar';

const theme = createMuiTheme({
  palette: {
    primary: {
      main:"#2e1667",
    },
    secondary: {
      main:"#c7d8ed",
    },
  },
  typography: {
    fontFamily: [
      'Roboto'
    ],
    h4: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: '2rem',
      },
    h5: {
      fontWeight: 100,
      lineHeight: '2rem',
    },
  },
});

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NavigationBar/>
      </ThemeProvider>
    </div>
  );
}

export default App;
