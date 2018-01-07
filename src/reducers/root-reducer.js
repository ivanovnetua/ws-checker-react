import { combineReducers } from 'redux'
import selectCurrencies from './get-currencies'
import getPairChains from './get-pair-chains'

export default combineReducers({
    selectCurrencies,
    getPairChains
}); 

