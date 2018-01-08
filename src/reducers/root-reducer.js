import { combineReducers } from 'redux'
import selectCurrencies from './get-currencies'
import getPairChains from './get-pair-chains'
import changeSteps from './change-steps'

export default combineReducers({
    selectCurrencies,
    getPairChains,
    changeSteps
}); 

