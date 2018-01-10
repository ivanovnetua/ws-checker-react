import _flattenDeep from 'lodash/flattenDeep'
import _uniq from 'lodash/uniq'


export default function getPairChains (state = {}, action) {

    // console.log(state, action);

    if (action.type === 'FIND_PAIR_CHAINS') {
        const regexp = /^(5~CCCAGG)~([a-zA-Z]{3,})~([a-zA-Z]{3,})/;

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
        const pairsObj = {};
        pairs.forEach(pair => {
            let findedElement = pair.match(regexp);
            pairsObj[`${findedElement[2]}-${findedElement[3]}`] = pair;
        })

        return { ...state, findedPairs: pairsObj }
         
    }


    return state
}