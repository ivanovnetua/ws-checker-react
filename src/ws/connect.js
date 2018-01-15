import io from 'socket.io-client'

export default class WS {

    constructor(ulr) {
        this.socketUrl = io.connect(ulr);
    }

    soketEmit(subscriptions = []) {
        this.socketUrl.emit('SubAdd', { subs: subscriptions })
    }

    soketUnsubscribe(unSubscriptions = []) {
        this.socketUrl.emit('SubRemove', { subs: unSubscriptions })
    }

    soketOn(callback) {
        this.socketUrl.on("m", callback)
    }
}