import React, { Component } from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import Grid  from 'react-bootstrap/lib/Grid'
import CoinsTable from './coinsTable'
import FirstStep from './first-step'
import SecondStep from './second-step'


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
                <Grid className="select-settings-section">
                    <p> For using application select setting firstime </p>
                    <Button
                        bsStyle="primary"
                        bsSize="large"
                        onClick={() => { modalAction(isCurrenciesModal) }}
                    >
                        Select currencies for monitoring
                    </Button>

                    <Modal show={isCurrenciesModal} onHide={() => { modalAction(isCurrenciesModal) }}>
                        { this.props.modalStepActive == 1 ? 
                            <FirstStep 
                                currencies={ currencies }
                                addCurrencyToList={ this.props.addCurrencyToList }
                                selectedCurrencies={ this.props.selectedCurrencies }
                                findPairChains = { this.props.findPairChains }
                            ></FirstStep> 
                            : null
                        }

                        { this.props.modalStepActive == 2 ? 
                            <SecondStep
                                findedPairChains ={ this.props.findedPairChains }
                                selectPairs={ this.props.addPairsToList }
                                selectedPairs = { this.props.selectedPairs }
                                displayResults = { this.props.displayResults }
                                ></SecondStep>
                            : null
                        }
                    </Modal>
                </Grid>
            )
        }

    }

}