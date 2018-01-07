import React, { Component } from 'react'
import Table from 'react-bootstrap/lib/Table'


export default class CoinsTable extends Component {

    selectRow(e, key) {
        // Todo: Add to array
        // Create trunk open modal + request
        // Add hoc and propTypes vor validate non undefined values

        this.refs[key].checked = !this.refs[key].checked;
    }

    render() {
        const currencies = this.props.currencies;

        return (
            <Table striped bordered condensed hover responsive>
                <tbody>
                    {
                        Object.keys(currencies).map(coin => {
                            const currentCoin = currencies[coin];

                            return (
                                <tr key={currentCoin['Id']} onClick={ (e) => this.selectRow(e, currentCoin['Id']) }>
                                    <td style={{ textAlign: 'center' }}>
                                        <input type='checkbox' value={ currentCoin['Id'] } ref={ currentCoin['Id'] } onClick={ (e) => this.selectRow(e, currentCoin['Id']) }/>
                                    </td>
                                    <td style={{ 'textAlign': 'center' }}>
                                        <img src={`https://www.cryptocompare.com/${currentCoin.ImageUrl}`} width="15px" height="auto" alt={currentCoin['FullName']} />
                                    </td>
                                    <td style={{ textAlign: 'left', paddingLeft: '20px' }}>
                                        {currentCoin['FullName']}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        )
    }
}