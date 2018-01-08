import { CONSTANTS } from '../constants/constants'
import _reject from 'lodash/reject'

let { getCurrenciesListUrl } = CONSTANTS;

export default function rootMiddleWare( store ) {
    return function(next) {
        return function(action) {

            switch (action.type) {
                case 'GET_CURRENCIES_LIST': 
                    fetch(action.message)
                    .then( r => r.json() )
                    .then( data => {
                        if(data.Response === 'Success') {
                            let newAction = { ...action, message: data.Data }
                            let newResult = next(newAction);
    
                            return newResult
                        } else {
                            // Todo: try to reload page pop-up
                            alert(`Response status ${ data.Response }`)
                        }
                    })
                    .catch(function(err) {
                        // Todo: try to reload page pop-up
                        alert("Connection error")
                    });
                    
                    break;

                case 'FIND_PAIR_CHAINS': 
                    let urls = action.findPairChains.map(pair => {
                        const objWithoutPair = _reject(action.findPairChains, (item) => item.Name == pair.Name);
                        const arrWithoutPair = objWithoutPair.map(item => item.Name);

                        return CONSTANTS.getPairFullInfo(arrWithoutPair, pair.Name);
                    
                    });

                    Promise.all(urls.map(url =>
                        fetch(url).then(resp => resp.text())
                    )).then(result => {
                        let newAction = { ...action, findPairChains: result }
                        let newResult = next(newAction);      
                    }).catch(function(err) {
                        // Todo: try to reload page pop-up
                        alert("Connection error")
                    });

                    break;

                default: next(action)

            }


        }
    }
}