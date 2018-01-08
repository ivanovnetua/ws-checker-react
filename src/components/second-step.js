import React, { Component } from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import Table from 'react-bootstrap/lib/Table'



export default class SecondStep extends Component {

    render() {

        if(this.props.findedPairChains ) {
            return (
                <div className="step-2">
                    <Modal.Header closeButton>
                        <Modal.Title>Select pairs</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <div className="">
                                <div className="">
                                    <div className="currencies-list">
                                        <Table striped bordered condensed hover responsive>
                                            <tbody>
                                                {
                                                    this.props.findedPairChains.map(coin => {
                                                        return (
                                                            <tr key={coin}>
                                                                <td style={{ textAlign: 'center' }}>
                                                                    <input type='checkbox' value={ coin } ref={ coin } />
                                                                </td>
                                                                <td style={{ textAlign: 'left', paddingLeft: '20px' }}>
                                                                    { coin }
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            // bsStyle={ this.props.selectedCurrencies.length > 1 ? 'primary' : 'default' }
                            // disabled={ this.props.selectedCurrencies.length < 2 }
                            // onClick={ () => this.props.findPairChains(this.props.selectedCurrencies) }
                        >NEXT STEP</Button>
                    </Modal.Footer>
                </div>
            )} else {
                return <div>Select currencies first time</div>
            }
    }
}