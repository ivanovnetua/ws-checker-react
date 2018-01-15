import React, { Component } from 'react'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'


export default class Menu extends Component {

    render() {
        return (
            <Navbar inverse collapseOnSelect fluid>
                <Navbar.Header>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem onClick={ () => { this.props.openSettings() } } href="#">
                            Settings
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        )
    }

}