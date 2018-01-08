import { CONSTANTS } from '../constants/constants'

let { getCurrenciesListUrl } = CONSTANTS;

export const getCurrenciesListAction = () => {
    const url = getCurrenciesListUrl;

    return {
        type: "GET_CURRENCIES_LIST", 
        message: url
    }
};

export const selectCurrenciesModalAction = (current) => {

    return {
        type: "CURRENCIES_MODAL_ACTION", 
        selectCurrenciesModalView: !current
    }
};

export const addCurrencyToListAction = (selectedCurrency) => {

    return {
        type: "ADD_CURRENCY_TO_LIST", 
        selectedCurrencies: selectedCurrency
    }
};

export const findPairChainsAction = (selectedCurrencies) => {
    return dispatch => {
        dispatch({
            type: "FIND_PAIR_CHAINS",
            findPairChains: selectedCurrencies
        })

        dispatch(changeModalStepAction(2))
    }
};

export const changeModalStepAction = (stepNumber) => {
    return {
        type: "CHANGE_MODAL_STEPS",
        modalStepActive: stepNumber
    }
};