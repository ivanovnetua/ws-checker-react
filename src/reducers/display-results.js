import { streamMode, msgUnpack, dataUnpack } from '../ws/wsParser';
import _reject from 'lodash/reject'
import _orderBy from 'lodash/orderBy'
import _find from 'lodash/find'
import _merge from 'lodash/merge'

export default function displayResults(state = {}, action) {

    // console.log(state, action);

    if (action.type === 'UPDATE_WS_DATA') {
        let message = action.wsData;
        let messageType = message.substring(0, message.indexOf("~"));
        let dataUpdate = {};

        if (messageType == streamMode('CURRENTAGG')) {
            let res = msgUnpack(message);
            let convertedData = dataUnpack(res);

            if (!state.currenciesUpdate) {
                return { ...state, currenciesUpdate: [convertedData] }
            } else {
                let filteredArray = _reject(state.currenciesUpdate, function(c) { return c.pairName == convertedData.pairName; });
                filteredArray.push(convertedData);
                let sortedArray = _orderBy(filteredArray, ['FROMSYMBOL', 'TOSYMBOL'], ['asc', 'asc']);

                let solvedConflicts = sortedArray.map(obj => {
                    let findObj =  _find(state.currenciesUpdate, function(o) { return o.pairName == obj.pairName; });
                    if (findObj) {
                        let mergeObj = _merge(findObj, obj);

                        return mergeObj;
                    } else {

                        return obj;
                    }
                });

                
                return { ...state, currenciesUpdate: solvedConflicts }
            }     
        }        

    }

    return state
}