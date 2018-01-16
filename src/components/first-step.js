import React, { Component } from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import CoinsTable from './coinsTable'

export default class FirstStep extends Component {

    render() {
        return (
            <div className="step-1">
                <Modal.Header closeButton>
                    <Modal.Title>Select currencies</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <div className="">
                            <div className="">
                                <div className="currencies-list">
                                    <CoinsTable
                                        currencies={ this.props.currencies }
                                        selectCurrency={ this.props.addCurrencyToList }
                                        selectedCurrencies={ this.props.selectedCurrencies }
                                    ></CoinsTable>
                                </div>
                            </div>
                        </div>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        bsStyle={ this.props.selectedCurrencies.length > 1 ? 'primary' : 'default' }
                        disabled={ this.props.selectedCurrencies.length < 2 }
                        onClick={ () => this.props.findPairChains(this.props.selectedCurrencies) }
                    >NEXT STEP</Button>
                </Modal.Footer>
            </div>
        )
    }
}