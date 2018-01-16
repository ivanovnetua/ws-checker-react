import React, { Component } from 'react'
import Button from 'react-bootstrap/lib/Button'
import Grid  from 'react-bootstrap/lib/Grid'

export default class FirstVisitSection extends Component {

    render() {
        const modalAction = this.props.selectCurrenciesModalToggle;
        const isCurrenciesModal = this.props.selectCurrenciesModal;

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
                </Grid>
            )
    }


}