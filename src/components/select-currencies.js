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

    selectCurrencies() {
        // Todo: add select action with array of currencies
        console.log('Select action');
    }

    render() {
        const currencies = this.props.currenciesInfo;
        const isCurrenciesModal = this.props.selectCurrenciesModal;
        const modalAction = this.props.selectCurrenciesModalToggle;

        if (!currencies || (isCurrenciesModal == undefined)) {
            return <h4> Loading... </h4>
        } else {
            // console.log(isCurrenciesModal );
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
                                            <CoinsTable currencies={ currencies } ></CoinsTable>
                                        </div>
                                    </div>
                                    </div>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => { this.selectCurrencies() }}>Select currencies</Button>
                        </Modal.Footer>
                    </Modal>
                </div>

            )
        }


    }


}