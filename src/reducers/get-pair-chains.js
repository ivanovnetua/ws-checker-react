import _flattenDeep from 'lodash/flattenDeep'
import _uniq from 'lodash/uniq'


export default function getPairChains (state = {}, action) {

    // console.log(state, action);

    if (action.type === 'FIND_PAIR_CHAINS') {

        const rawChains = action.findPairChains.map(item => {
            const parsedObj = JSON.parse(item);
            
            let keyArray = [];
            let ArrayPairs = []

            for (let key in parsedObj) {
                keyArray.push(key)
                ArrayPairs.push(parsedObj[key]['SubsNeeded'])
            }

            return ArrayPairs
            
        });

        const pairs = _uniq(_flattenDeep(rawChains));

        //Format: 5~CCCAGG~ETH~BTC

        return { ...state, findedPairChains: pairs }
         
    }


    return state
} 