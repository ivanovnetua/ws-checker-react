export const CONSTANTS = {
        getCurrenciesListUrl: 'https://min-api.cryptocompare.com/data/all/coinlist',
        getPairFullInfo: (from, to) => `https://min-api.cryptocompare.com/data/subsWatchlist?fsyms=${from}&tsym=${to}`
}