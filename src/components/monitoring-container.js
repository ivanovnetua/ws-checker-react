import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SocketProvider } from 'socket.io-react'
import io from 'socket.io-client'
import Grid  from 'react-bootstrap/lib/Grid'


import CurrenciesList from '../components/currencies-list'
import SelectCurrencies from '../components/select-currencies'
import { 
        getCurrenciesListAction, 
        selectCurrenciesModalAction, 
        addCurrencyToListAction, 
        findPairChainsAction,
        addPairsToListAction,
        displayResultsAction
} from '../actions/app-actions'

class MonitoringContainer extends Component {
    render() {
        return (
            // <SocketProvider socket={socket}>
                <div className="App">
                    <Grid>
                        <SelectCurrencies 
                                getCurrenciesList={ this.props.getCurrenciesList }
                                currenciesInfo={ this.props.currenciesInfo }
                                selectCurrenciesModal = { this.props.selectCurrenciesModalView }
                                selectCurrenciesModalToggle = { this.props.selectCurrenciesModalToggle }
                                selectedCurrencies = { this.props.selectedCurrencies }
                                addCurrencyToList = { this.props.addCurrencyToList }
                                findPairChains = { this.props.findPairChains }
                                findedPairChains = { this.props.findedPairChains }
                                modalStepActive = { this.props.modalStepActive }
                                addPairsToList = { this.props.addPairsToList }
                                selectedPairs = { this.props.selectedPairs }
                                displayResults = { this.props.displayResults }
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
            currenciesInfo: state.selectCurrencies.currenciesInfo,
            selectCurrenciesModalView: state.selectCurrencies.selectCurrenciesModalView || false,
            selectedCurrencies: state.selectCurrencies.selectedCurrencies,
            findedPairChains: state.getPairChains.findedPairs,
            modalStepActive: state.changeSteps.modalStepActive,
            selectedPairs: state.pairsResult.selectedPairs
        }
    }, (dispatch) => {

        return {
            getCurrenciesList: bindActionCreators(getCurrenciesListAction, dispatch),
            selectCurrenciesModalToggle: bindActionCreators(selectCurrenciesModalAction, dispatch),
            addCurrencyToList: bindActionCreators(addCurrencyToListAction, dispatch),
            findPairChains: bindActionCreators(findPairChainsAction, dispatch),
            addPairsToList: bindActionCreators(addPairsToListAction, dispatch),
            displayResults: bindActionCreators(displayResultsAction, dispatch),
        }
    })(MonitoringContainer);
