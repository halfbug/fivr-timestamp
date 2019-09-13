import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Master from './components/dashboard/Master'
import {createMuiTheme} from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { BrowserRouter } from "react-router-dom";


const theme = createMuiTheme({
  palette: {
      // type: "dark",
      primary: {
          main: '#22704c',
      },
      secondary: {
          main: '#f57f17',
      },
  },
});


class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <MuiThemeProvider theme={theme}>
        <Master></Master>  
        </MuiThemeProvider>
        
      </div>
      </BrowserRouter>
    );
  }
}

export default App;

