import _reject from 'lodash/reject'
import _values from 'lodash/values'
import _differenceWith from 'lodash/differenceWith'
import _isEqual from 'lodash/isEqual'
import { resourses } from '../resourses/resourses'

export const getCurrenciesListAction = () => {

    let promise = new Promise((resolve, reject) => {
        resourses.getCoinsList()
        .then(r => r.json())
        .then( data => {
            if(data.Response === 'Success') {
                let action = {
                    type: "GET_CURRENCIES_LIST", 
                    message: data.Data 
                };
                resolve(action);
            } else {
                reject(new Error(`Response status ${ data.Response }`));
            }
        })
        .catch(function(err) {
            reject(new Error(`"Connection error"`));
        });

    });

    return promise
};

export const selectCurrenciesModalAction = (current) => {
    return dispatch => {
        getCurrenciesListAction().then( result => {
            dispatch(result);
            dispatch(modalAction(current));
        });

    }
};

export const modalAction = (current) => {
    return dispatch => {
            dispatch(changeModalStepAction(1));
            dispatch({
                type: "CURRENCIES_MODAL_ACTION", 
                selectCurrenciesModalView: !current
            })
    }

    }

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
            });
            dispatch(changeModalStepAction(2));

        }).catch(function(err) {
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
    return (dispatch, getState) => {
        let chanels = pairs.map(pair => {
            return _values(pair).join();
        });
        let state = getState();
        dispatch(saveToLocalStorage(chanels));
        dispatch(subscribeToWS(chanels));
        dispatch(wsListener());
        dispatch(modalAction(state.selectCurrencies.selectCurrenciesModalView));
    }
};

export const callWsAction = () => {
    return dispatch => {
       dispatch({
            type: "INITIATE_WEBSOKET",
       })
    }
};

export const subscribeToWS = (chanels = []) => {

    return (dispatch, getState) => {
        let state = getState();

        if (state.websocket.wsChanels) {
            let unsubscribeChanels = _reject(state.websocket.wsChanels, function(c) { 
                return chanels.some(el => {
                    return !c == el
                });
            });

            if (unsubscribeChanels.length > 0) {
                dispatch({
                    type: "UNSUBSCRIBE_WS_CHANELS",
                    chanels: {
                        unSubscribe: unsubscribeChanels
                    }
                });

                dispatch(removeOld());

            }
        }

        dispatch({
            type: "SUBSCRIBE_TO_WS_CHANELS",
            chanels: {
                subscribe: chanels,
            }
        })
        
    }
};

export const removeOld = () => {
    return dispatch => {
        dispatch({
            type: "REMOVE_OLD_LISTS",
        })
     }

};

export const wsListener = () => {
    return (dispatch, getState) => {
        let state = getState();
        state.websocket.socketOn(message => {
            dispatch(updateWsData(message))
        });
     }

};

export const updateWsData = (message) => {
    return dispatch => {
            dispatch({
                type: "UPDATE_WS_DATA",
                wsData: message
           })
     }

};

export const saveToLocalStorage = (value) => {
    return (dispatch, getState) => {
        let state = getState();
        let selectedSettings = [ ...state.selectCurrencies.selectedCurrencies ];
        try {
            localStorage.setItem('saved-chanels', JSON.stringify(value));
        } catch(e) {
            console.log(`LocalStorage is undefined. Reason: ${e}`);
        }
     }
};

export const checkSavedPairsAction = () => {
    return dispatch => {
        try {
            let savedChanels = JSON.parse(localStorage.getItem('saved-chanels'));
            dispatch(subscribeToWS(savedChanels));
            dispatch(wsListener());
        } catch(e) {
            console.log(`LocalStorage is undefined. Reason: ${e}`);
        }
     }
};

export const setSavedState = (state = []) => {
    return dispatch => {
        dispatch({
            type: "SET_SAVED_STATE",
            savedState: state
        })
    }
}