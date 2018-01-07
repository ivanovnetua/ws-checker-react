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
