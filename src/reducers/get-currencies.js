import _orderBy from 'lodash/orderBy'
import _find from 'lodash/find'
import _reject from 'lodash/reject'

const currenciesDefaultState = {
    selectedCurrencies: []
};


export default function selectCurrencies (state = currenciesDefaultState, action) {
    // console.log('action', action);
    // console.log('state', state);

    if (action.type === 'GET_CURRENCIES_LIST') {
        const limit = 20;
        let sortedCurrencies = action.message;
        
        if(sortedCurrencies) {
            const arrayObj = Object.keys(sortedCurrencies).map(key => {
                return { ...sortedCurrencies[key], 'SortOrder': parseInt(sortedCurrencies[key]['SortOrder'], 10) }
            });
            sortedCurrencies = _orderBy(arrayObj, ['SortOrder'], ['asc']).splice(0, limit);
        }

        return { ...state, currenciesInfo: sortedCurrencies }
    }

    if (action.type === 'CURRENCIES_MODAL_ACTION') {
        return { ...state, selectCurrenciesModalView: action.selectCurrenciesModalView }
    }

    if (action.type === 'ADD_CURRENCY_TO_LIST') {

        let isInArray = _find(state.selectedCurrencies, action.selectedCurrencies) ? true : false;

        if (isInArray) {
            let filteredArray = _reject(state.selectedCurrencies, function(c) { return c.Id == action.selectedCurrencies.Id; });

            return { 
                ...state, 
                selectedCurrencies: filteredArray
            }
        } else {

            return { 
                ...state, 
                selectedCurrencies: [...state.selectedCurrencies, action.selectedCurrencies]
            }
        }

    }

    return state
} 