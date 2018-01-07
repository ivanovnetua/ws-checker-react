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

                default: next(action)

            }


        }
    }
}