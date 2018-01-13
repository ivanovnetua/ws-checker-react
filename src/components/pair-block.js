import React, { Component } from 'react'
import Col  from 'react-bootstrap/lib/Col'

import getConstants from '../constants/constants'

export default class PairBlock extends Component {

    render() {
            let constants = getConstants();
            let pairData = [];

            for (let index in this.props.data) {
                if(constants.pairLabels.hasOwnProperty(index)) {
                    pairData.push(<p key={index}>{ constants.pairLabels[index] } {this.props.data[index]}</p>)
                }
            }

            return (



                        <Col md={ 3 } mdOffset={ 1 } className="price-boxes">
                            <div className="panel-group">
                                <div className="panel panel-default">

                                        { pairData}



                                    {/* <div classname="panel-body">
                                    <h2 classname="price-display">BTC - USD <span classname="price" id="PRICE_BTC" /></h2>
                                    <h5>24h Change: <span id="CHANGE24HOUR_BTC" /><span id="CHANGE24HOURPCT_BTC" /><br /></h5>
                                    <h5>Last Market: <span classname="exchange" id="LASTMARKET_BTC" /> <br /></h5>
                                    <h5>Trade ID: <span id="LASTTRADEID_BTC" /><br /></h5>
                                    <h5>Open Hour: <span id="OPENHOUR_BTC" /><br /></h5>
                                    <h5>High Hour: <span id="HIGHHOUR_BTC" /><br /></h5>
                                    <h5>Low Hour: <span id="LOWHOUR_BTC" /><br /></h5>
                                    <h5>Open Day: <span id="OPEN24HOUR_BTC" /><br /></h5>
                                    <h5>High Day: <span id="HIGH24HOUR_BTC" /><br /></h5>
                                    <h5>Low Day: <span id="LOW24HOUR_BTC" /><br /></h5>
                                    <h5>Last Trade Volume: <span id="LASTVOLUME_BTC" /><br /></h5>
                                    <h5>Last Trade Volume To: <span id="LASTVOLUMETO_BTC" /><br /></h5>
                                    <h5>24h Volume: <span id="VOLUME24HOUR_BTC" /><br /></h5>
                                    <h5>24h VolumeTo: <span id="VOLUME24HOURTO_BTC" /><br /></h5>
                                    </div> */}
                                </div>
                                </div>
                        </Col>

            )

    }

}