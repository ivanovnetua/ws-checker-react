import _reject from 'lodash/reject'
import { resourses } from '../resourses/resourses'

export const getCurrenciesListAction = () => {

    return dispatch => {
        resourses.getCoinsList()
        .then(r => r.json())
        .then( data => {
            if(data.Response === 'Success') {
                dispatch({
                    type: "GET_CURRENCIES_LIST", 
                    message: data.Data 
                })
            } else {
                // Todo: try to reload page pop-up
                alert(`Response status ${ data.Response }`)
            }
        })
        .catch(function(err) {
                // Todo: try to reload page pop-up
                alert("Connection error")
            });
        }
};

export const selectCurrenciesModalAction = (current) => {
    return dispatch => {
        dispatch({
            type: "CURRENCIES_MODAL_ACTION", 
            selectCurrenciesModalView: !current
        })
    }
};

export const addCurrencyToListAction = (selectedCurrency) => {
    return dispatch => {
        dispatch({
            type: "ADD_CURRENCY_TO_LIST", 
            selectedCurrencies: selectedCurrency
        })
    }
};

export const findPairChainsAction = (selectedCurrencies) => {
    return dispatch => {
        let promises = selectedCurrencies.map(pair => {
            const objWithoutPair = _reject(selectedCurrencies, (item) => item.Name == pair.Name);
            const arrWithoutPair = objWithoutPair.map(item => item.Name);

            return resourses.getPairFullInfo(arrWithoutPair, pair.Name);
        });

        Promise.all(promises.map(promise =>
            promise.then(resp => resp.text())
        )).then(result => {
            dispatch({
                type: "FIND_PAIR_CHAINS",
                findPairChains: result
            })
            dispatch(changeModalStepAction(2))

        }).catch(function(err) {
            // Todo: try to reload page pop-up
            alert("Connection error")
        });

    }
};

export const changeModalStepAction = (stepNumber) => {
    return {
        type: "CHANGE_MODAL_STEPS",
        modalStepActive: stepNumber
    }
};

export const addPairsToListAction = (pair) => {
    return dispatch => {
       dispatch({
            type: "ADD_PAIR_TO_LIST",
            selectedPair: pair
       })
    }
};

export const displayResultsAction = (pairs) => {
    return dispatch => {
       dispatch({
            type: "DISPLAY_RESULTS",
            pairsForDisplay: pairs
       })
    }
};