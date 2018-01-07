import React, { Component } from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import CoinsTable from './coinsTable'


export default class SelectCurrencies extends Component {
    componentDidMount() {
        this.props.getCurrenciesList();
    }

    render() {
        const currencies = this.props.currenciesInfo;
        const isCurrenciesModal = this.props.selectCurrenciesModal;
        const modalAction = this.props.selectCurrenciesModalToggle;

        if (!currencies || (isCurrenciesModal == undefined) || (this.props.selectedCurrencies == undefined)) {
            return <h4> Loading... </h4>
        } else {
            return (
                <div>
                    <Button
                        bsStyle="primary"
                        bsSize="large"
                        onClick={() => { modalAction(isCurrenciesModal) }}
                    >
                        Select currencies for monitoring
                    </Button>

                    <Modal show={isCurrenciesModal} onHide={() => { modalAction(isCurrenciesModal) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Select currencies</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <div className="">
                                    <div className="">
                                        <div className="currencies-list">
                                            <CoinsTable
                                                currencies={ currencies }
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
                                bsStyle={ this.props.selectedCurrencies.length > 0 ? 'primary' : 'default' }
                                disabled={ this.props.selectedCurrencies.length == 0 }
                                onClick={ () => this.props.findPairChains(this.props.selectedCurrencies) }
                            >NEXT STEP</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )
        }

    }

}