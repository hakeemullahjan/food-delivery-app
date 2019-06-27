import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Tabs,Tab,Sonnet } from 'react-bootstrap'

class UserView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                {/* <h1>USER VIEW</h1> */}
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                    <Tab eventKey="restaurants" title="Restaurants">
                       
                    </Tab>
                    <Tab eventKey="myrequest" title="My Requests">
                        
                    </Tab>
                    
                </Tabs>
            </div>
        );
    }
}

export default UserView;