export default function getCurrenciesList (state={}, action) {
    if (action.type === 'GET_CURRENCIES_LIST') {
        return { ...state, currenciesInfo: action.message }
    }

    return state
} 