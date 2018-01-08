export default function getPairChains (state = {}, action) {

    console.log(state, action);

    if (action.type === 'FIND_PAIR_CHAINS') {
        console.log(action.findPairChains);
        return { ...state, findedPairChains: action.findPairChains }
    }


    return state
} 