import React, { Component } from 'react'
import PairBlock from './pair-block'

export default class DisplayCurrencies extends Component {

    render() {
            return (
                this.props.currenciesUpdate.map( pairObj => {
                    return (
                        <PairBlock key={ pairObj.pairName } data={pairObj}></PairBlock>
                    )
                })
            )
    }

}