import React, { Component } from 'react'

export default class DisplayCurrencies extends Component {

    render() {

        console.log('view', this.props.currenciesUpdate)

            return (
                this.props.currenciesUpdate.map( pairObj => {
                    return (
                        <div key={ pairObj.pairName }>
                            <p>{ pairObj.pairName }</p>
                        </div>
                    )

                })
            )

    }

}