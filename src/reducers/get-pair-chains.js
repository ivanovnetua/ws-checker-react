export default function getPairChains (state = {}, action) {

    if (action.type === 'SELECT_PAIR_CHAINS') {
        return { ...state, findedPairChains: action.findPairChains }
    }


    return state
} 