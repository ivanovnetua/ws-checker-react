import wsConnect from '../ws/connect'
import { resourses } from '../resourses/resourses'

const socketInit = new wsConnect(resourses.websoketUrl);

const defaultWsState = {
    socketConnect: socketInit,
    socketEmit: socketInit.soketEmit.bind(socketInit),
    socketOn: socketInit.soketOn.bind(socketInit),
};

export default function websocket (state = defaultWsState, action) {

    if (action.type === 'INITIATE_WEBSOKET') {
        return state
    }

    if (action.type === 'SUBSCRIBE_TO_WS_CHANELS') {
        state.socketEmit(action.chanels);
        return state
    }

    return state
} 