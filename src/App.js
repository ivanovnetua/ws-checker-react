import React, { Component } from 'react'
import CurrenciesList from './components/currencies-list'
import SelectCurrencies from './components/select-currencies'
import './App.css'
import { SocketProvider } from 'socket.io-react'
import io from 'socket.io-client'

// const socket = io.connect('https://streamer.cryptocompare.com/');
// socket.on('message', msg => console.log(msg));
// var subscription = ['5~CCCAGG~BTC~USD', '5~CCCAGG~ETH~USD'];
// socket.emit('SubAdd', { subs: subscription });
// socket.on("m", function(message) {
//   var messageType = message.substring(0, message.indexOf("~"));
//   var res = {};
//   console.log(message);
// })



class App extends Component {

  render() {


    return (
      // <SocketProvider socket={socket}>
        <div className="App">
          <SelectCurrencies></SelectCurrencies>

          {/* <CurrenciesList></CurrenciesList> */}

        </div>
      // </SocketProvider>
    );
  }
}

export default App;
