import _find from 'lodash/find'
import _reject from 'lodash/reject'

const currenciesDefaultState = {
    selectedPairs: []
};

export default function pairsResult(state = currenciesDefaultState, action) {

    // console.log(state, action);

    if (action.type === 'ADD_PAIR_TO_LIST') {

        let isInArray = _find(state.selectedPairs, action.selectedPair) ? true : false;

        if (isInArray) {
            let filteredArray = _reject(state.selectedPairs, function(c) { 
                let isRepeat = Object.keys(action.selectedPair).join() == Object.keys(c).join();
                return isRepeat; 
            });

            return { 
                ...state, 
                selectedPairs: filteredArray
            }
        } else {

            return { 
                ...state, 
                selectedPairs: [...state.selectedPairs, action.selectedPair]
            }
        }

    }

    return state
}