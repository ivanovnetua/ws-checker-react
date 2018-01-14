import React, { Component } from 'react'
import Col  from 'react-bootstrap/lib/Col'

import getConstants from '../constants/constants'

export default class PairBlock extends Component {

    render() {
            let constants = getConstants();
            let pairData = [];

            for (let index in this.props.data) {
                if(constants.pairLabels.hasOwnProperty(index)) {
                    let element = (index, element, label) => {

                        if (index === 'pairName') {

                            return (
                                <p className='pair-name' key={ index }>
                                    { element }
                                </p>
                            )
                        } else {
                            return (
                                <p key={ index }>
                                    <span className='pair-label'>{ label }</span>
                                    { element }
                                </p>                            
                            )
                        }
                        
                    };

                    pairData.push(element(index, this.props.data[index], constants.pairLabels[index])
                    )
                }
            }

            return (

                        <Col md={ 3 } className="price-boxes">
                            <div className="panel-group">
                                <div className="panel panel-default">
                                    { pairData}
                                </div>
                                </div>
                        </Col>

            )

    }

}