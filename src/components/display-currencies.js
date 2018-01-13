import React, { Component } from 'react'
import PairBlock from './pair-block'

export default class DisplayCurrencies extends Component {

    render() {

        console.log('view', this.props.currenciesUpdate)

            return (
                this.props.currenciesUpdate.map( pairObj => {
                    return (

                        <PairBlock data={pairObj}></PairBlock>

                    )
                })
            )

    }

}