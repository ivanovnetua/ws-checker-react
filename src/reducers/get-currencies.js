import orderBy from 'lodash/orderBy'

export default function selectCurrencies (state={}, action) {
    // console.log('here', action);
    if (action.type === 'GET_CURRENCIES_LIST') {
        const limit = 20;
        let sortedCurrencies = action.message;
        
        if(sortedCurrencies) {
            const arrayObj = Object.keys(sortedCurrencies).map(key => {
                return { ...sortedCurrencies[key], 'SortOrder': parseInt(sortedCurrencies[key]['SortOrder'], 10) }
            });
            sortedCurrencies = orderBy(arrayObj, ['SortOrder'], ['asc']).splice(0, limit);
        }

        return { ...state, currenciesInfo: sortedCurrencies }
    }

    if (action.type === 'CURRENCIES_MODAL_ACTION') {
        return { ...state, selectCurrenciesModalView: action.selectCurrenciesModalView }
    }

    return state
} 