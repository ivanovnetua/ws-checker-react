import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SocketProvider } from 'socket.io-react'
import io from 'socket.io-client'
import Grid  from 'react-bootstrap/lib/Grid'


import CurrenciesList from '../components/currencies-list'
import SelectCurrencies from '../components/select-currencies'
import { getCurrenciesListAction } from '../actions/app-actions.js'

class MonitoringContainer extends Component {
    render() {
        return (
            // <SocketProvider socket={socket}>
                <div className="App">
                    <Grid>
                        <SelectCurrencies 
                                getCurrenciesList={ this.props.getCurrenciesList }
                                currenciesInfo={ this.props.currenciesInfo }
                        ></SelectCurrencies>
                    </Grid>
                    {/* <CurrenciesList></CurrenciesList> */}
                </div>
            // </SocketProvider>
        )
    }

}



export default connect(
    (state) => {

        return {
            currenciesInfo: state.getCurrenciesList.currenciesInfo
        }
  }, 
  (dispatch) => {

        return {
            getCurrenciesList: bindActionCreators(getCurrenciesListAction, dispatch)
        
        }
  })(MonitoringContainer);
