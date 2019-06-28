import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Tabs, Tab, Sonnet, Row, Col, Nav, Button, ButtonToolbar, Card } from 'react-bootstrap'
import { MDBCol, MDBFormInline, MDBBtn, MDBIcon } from "mdbreact";
import RestaurantViewScreen from '../detailscreen/RestaurantViewScreen.jsx'
import { db } from '../../config/firebase'

class RestaurantView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    Pending() {
        return (
            <div>
                <h1>pending</h1>
            </div>
        )
    }

    InProgress() {
        return (
            <div>
                <h1>in progress</h1>
            </div>
        )
    }
    Delivered() {
        return (
            <div>
                <h1>delivered</h1>
            </div>
        )
    }

    render() {
        return (
            <div className='container'>

                <Tabs defaultActiveKey="myscreen" id="uncontrolled-tab-example" >
                <Tab eventKey="myscreen" title="My Screen" >
                        <br />
                        <RestaurantViewScreen/>
                    </Tab>
                    <Tab eventKey="pending" title="Pending" >
                        <br />
                        {this.Pending()}
                    </Tab>
                    <Tab eventKey="inprogress" title="In Progress">
                        <br />
                        {this.InProgress()}
                    </Tab>
                    <Tab eventKey="delivered" title="Delivered">
                        <br />
                        {this.Delivered()}
                    </Tab>

                </Tabs>


            </div>
        );
    }
}

export default RestaurantView;