import wsConnect from '../ws/connect'
import { resourses } from '../resourses/resourses'

const socketInit = new wsConnect(resourses.websoketUrl);

const defaultWsState = {
    socketConnect: socketInit,
    socketEmit: socketInit.soketEmit.bind(socketInit),
    socketOn: socketInit.soketOn.bind(socketInit),
    soketUnsubscribe: socketInit.soketUnsubscribe.bind(socketInit),
};

export default function websocket (state = defaultWsState, action) {


    if (action.type === 'SUBSCRIBE_TO_WS_CHANELS') {
        state.socketEmit(action.chanels.subscribe);

        return { ...state, wsChanels: action.chanels.subscribe }
    }

    if (action.type === 'UNSUBSCRIBE_WS_CHANELS') {
        if (action.chanels.unSubscribe) {
            state.soketUnsubscribe(action.chanels.unSubscribe);
        }

        return state
    }



    return state
} 