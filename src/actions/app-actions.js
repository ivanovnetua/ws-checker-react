import { CONSTANTS } from '../constants/constants'

let { getCurrenciesListUrl } = CONSTANTS;

export const getCurrenciesListAction = () => {
    const url = getCurrenciesListUrl;

    return {
        type: "GET_CURRENCIES_LIST", 
        message: url
    }
};

