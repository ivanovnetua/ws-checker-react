import React, { Component } from 'react'
import Col  from 'react-bootstrap/lib/Col'
import Row  from 'react-bootstrap/lib/Row'


export default class SelectCurrencies extends Component {
    componentDidMount() {
        this.props.getCurrenciesList();
    }

    render() {
        const currencies = this.props.currenciesInfo;
        
        if (!currencies) {
            return <h4> Loading... </h4>
        } else {
            console.log(currencies);
            return (
                <Row>
                        <div className="">
                            <div className="">
                                <div className="currencies-list">
                                        { 
                                            Object.keys(currencies).map( coin => {
                                                const currentCoin = currencies[coin];

                                                return (
                                                    <Col md={ 2 }  key={ currentCoin['Id'] } style={{ 'text-align': 'center', margin: '25px 0px', 'min-height': '120px' }}>
                                                        <div style={{ 'text-align': 'center' }}>
                                                            <img src={ `https://www.cryptocompare.com/${currentCoin.ImageUrl}` } width="30px" height="auto"/>
                                                        </div>
                                                        {/* <input type="checkbox" id={ currentCoin['Id'] }  name="coins" value={ currentCoin['FullName'] }/> */}
                                                        <label htmlFor={ currentCoin['Id'] }>{ currentCoin['FullName'] }</label>
                                                    </Col>
                                                )
                                            })
                                        }
                                </div>
                            </div>
                            </div>
                </Row>
            )
        }


    }


}


// export default SelectCurrencies extends Component {
//     // componentWillMount() {
//     //     fetch('https://min-api.cryptocompare.com/data/all/coinlist')
//     //     .then( r => r.json() )
//     //     .then( data => {
        
//     //       if(data.Response === 'Success') {
//     //         console.log(data.Data);
            
    
    
//     //       } else {
//     //         throw `Response status ${ data.Response }`
//     //       }
    
//     //     })
//     //     .catch(function(err) {
//     //       throw "Connection error"
//     //     });
    
    
//     //   }
// //     render() {
// //         return (
// // <h1></h1>
// //         )
// //     }
// }