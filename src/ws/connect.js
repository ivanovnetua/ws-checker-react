import io from 'socket.io-client'

export default class WS {

    constructor(ulr) {
        this.socketUrl = io.connect(ulr);
    }

    soketEmit(subscriptions = []) {
        this.socketUrl.emit('SubAdd', { subs: subscriptions })
    }

    soketOn(callback) {
        this.socketUrl.on("m", callback)
    }
}


    
    // subscription: ['5~CCCAGG~BTC~USD', '5~CCCAGG~ETH~USD'],
    // soketOn: socket.on("m", function(message) {
        // var messageType = message.substring(0, message.indexOf("~"));
        // var res = {};
        // if (messageType == CCC.STATIC.TYPE.CURRENTAGG) {
        // 	res = CCC.CURRENT.unpack(message);
        // 	dataUnpack(res);
        // }
    // }