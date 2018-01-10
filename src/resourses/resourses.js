export const resourses =  {
    getCoinsList() {
        return fetch('https://min-api.cryptocompare.com/data/all/coinlist');
    },
    getPairFullInfo(from, to) {
        return fetch(`https://min-api.cryptocompare.com/data/subsWatchlist?fsyms=${from}&tsym=${to}`)
    }
}


