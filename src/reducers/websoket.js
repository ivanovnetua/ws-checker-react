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

//todo: remove from dom after ubsub, reset subs after first select, view selected checkboxes in open modal

    if (action.type === 'SUBSCRIBE_TO_WS_CHANELS') {
        if (action.chanels.unSubscribe) {
            state.soketUnsubscribe(action.chanels.unSubscribe);
        }
        state.socketEmit(action.chanels.subscribe);
        return { ...state, wsChanels: action.chanels.subscribe }
    }

    return state
} 