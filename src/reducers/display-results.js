import { streamMode, msgUnpack, dataUnpack } from '../ws/wsParser';
import _reject from 'lodash/reject'
import _orderBy from 'lodash/orderBy'

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

                return { ...state, currenciesUpdate: sortedArray }
            }     
        }        

    }

    return state
}