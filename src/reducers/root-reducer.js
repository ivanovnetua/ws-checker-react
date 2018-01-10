import { combineReducers } from 'redux'
import selectCurrencies from './get-currencies'
import getPairChains from './get-pair-chains'
import changeSteps from './change-steps'
import pairsResult from './pairs-result'
import displayResults from './display-results'

export default combineReducers({
    selectCurrencies,
    getPairChains,
    changeSteps,
    pairsResult,
    displayResults
}); 

