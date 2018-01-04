import React, { Component } from 'react'
import Grid  from 'react-bootstrap/lib/Grid'
import Col  from 'react-bootstrap/lib/Col'
import Row  from 'react-bootstrap/lib/Row'


export default class CurrenciesList extends Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col md={ 12 } mdOffset={ 1 } className="price-boxes">
                        <div classname="panel-group">
                            <div classname="panel panel-default">
                                <div classname="panel-body">
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
                                </div>
                            </div>
                            </div>
                    </Col>
                </Row>
            </Grid>
        )
    }
}