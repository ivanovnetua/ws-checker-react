import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers/root-reducer'
import MonitoringContainer from './components/monitoring-container'
import './App.css'


// const socket = io.connect('https://streamer.cryptocompare.com/');
// socket.on('message', msg => console.log(msg));
// var subscription = ['5~CCCAGG~BTC~USD', '5~CCCAGG~ETH~USD'];
// socket.emit('SubAdd', { subs: subscription });
// socket.on("m", function(message) {
//   var messageType = message.substring(0, message.indexOf("~"));
//   var res = {};
//   console.log(message);
// })

let store = createStore(rootReducer, applyMiddleware(thunk));

class App extends Component {

  render() {
    return (
      <Provider store={ store }>
        <MonitoringContainer></MonitoringContainer>
      </Provider>
    );
  }
}

export default App
