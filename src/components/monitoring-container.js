import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SocketProvider } from 'socket.io-react'
import Grid  from 'react-bootstrap/lib/Grid'

import SelectCurrencies from '../components/select-currencies'
import DisplayCurrencies from '../components/display-currencies'
import Menu from '../components/menu'
import FirsVisitSection from '../components/first-visit'

import { 
        getCurrenciesListAction, 
        selectCurrenciesModalAction, 
        addCurrencyToListAction, 
        findPairChainsAction,
        addPairsToListAction,
        displayResultsAction,
        checkSavedPairsAction
} from '../actions/app-actions'



class MonitoringContainer extends Component {
    componentDidMount() {
        this.props.checkSavedPairs();
    }

    render() {
        return (
            <SocketProvider socket={ this.props.socket}>
                <div className="App">
                    { this.props.currenciesUpdate ? 
                        <Menu
                            openSettings = { this.props.selectCurrenciesModalToggle }
                        ></Menu> 
                    : null }
                    <Grid>
                        { this.props.currenciesUpdate
                            ?
                            <DisplayCurrencies
                                currenciesUpdate = { this.props.currenciesUpdate }
                            ></DisplayCurrencies>
                            : 
                                <FirsVisitSection
                                    selectCurrenciesModalToggle = { this.props.selectCurrenciesModalToggle }
                                    selectCurrenciesModal = { this.props.selectCurrenciesModalView }
                                ></FirsVisitSection>
                        
                        }
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
                </div>
            </SocketProvider>
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
            selectedPairs: state.pairsResult.selectedPairs,
            currenciesUpdate: state.displayResults.currenciesUpdate
        }
    }, (dispatch) => {

        return {
            getCurrenciesList: bindActionCreators(getCurrenciesListAction, dispatch),
            selectCurrenciesModalToggle: bindActionCreators(selectCurrenciesModalAction, dispatch),
            addCurrencyToList: bindActionCreators(addCurrencyToListAction, dispatch),
            findPairChains: bindActionCreators(findPairChainsAction, dispatch),
            addPairsToList: bindActionCreators(addPairsToListAction, dispatch),
            displayResults: bindActionCreators(displayResultsAction, dispatch),
            checkSavedPairs: bindActionCreators(checkSavedPairsAction, dispatch)
        }
    })(MonitoringContainer);
