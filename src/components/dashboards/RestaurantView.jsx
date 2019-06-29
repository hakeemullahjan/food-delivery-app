import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Tabs, Tab, Sonnet, Row, Col, Nav, Button, ButtonToolbar, Card } from 'react-bootstrap'
import { MDBCol, MDBFormInline, MDBBtn, MDBIcon } from "mdbreact";
import RestaurantViewScreen from '../detailscreen/RestaurantViewScreen.jsx'
import { db, auth } from '../../config/firebase'

class RestaurantView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            orderProgress: [],
            orderDeliver: []
        };
    }
    componentDidMount() {

        db.collection('orders').get()
            .then(snap => {
                console.log(snap.docs)
                snap.docs.forEach(doc => {
                    // console.log(doc.data().restaurants)
                    var restuid = auth.currentUser.uid
                    console.log(restuid)
                    console.log(doc.id)
                    console.log(doc.data())
                    if (restuid === doc.data().restuid && doc.data().status === 'pending') {
                        let ord = this.state.orders;
                        ord.push(doc.data())
                        this.setState({ orders: ord })
                    }
                    if (restuid === doc.data().restuid && doc.data().status === 'inprogress') {
                        let ord = this.state.orderProgress
                        ord.push(doc.data())
                        this.setState({ orderProgress: ord })
                    }
                    if (restuid === doc.data().restuid && doc.data().status === 'delivered') {
                        let ord = this.state.orderDeliver
                        ord.push(doc.data())
                        this.setState({ orderDeliver: ord })
                    }


                })
            })

    }
    handleOrder(id) {
        // alert(id)
        db.collection('orders').doc(id).update({
            status: 'inprogress'
        })


    }
    handleProgress(id) {
        db.collection('orders').doc(id).update({
            status: 'delivered'
        })
    }


    Pending() {
        // console.log('allorders',this.state.orders[0])
        return (
            <div>
                <h1>pending</h1>
                <span> Dish  </span>
                <span> Price </span>
                <span> Status </span>

                {this.state.orders.map(item => {

                    return (
                        <div>
                            <b>  <span> {item.dish} </span></b>
                            <b>      <span> {item.price} </span></b>
                            <b> <span> {item.status} </span></b>

                            <button onClick={this.handleOrder.bind(this, item.orderid)}>approve</button>
                            <hr />
                        </div>
                    )
                })}
            </div>
        )
    }


    InProgress() {
        return (
            <div>
                <h1>in progress</h1>
                <span> Dish  </span>
                <span> Price </span>
                <span> Status </span>

                {this.state.orderProgress.map(item => {
                    return (
                        <div>
                            <b> <span> {item.dish} </span></b>
                            <b><span> {item.price} </span></b>
                            <b><span> {item.status} </span></b>
                            <button onClick={this.handleProgress.bind(this, item.orderid)} >in progress</button>
                            <hr />
                        </div>
                    )
                })}
            </div>
        )
    }
    Delivered() {
        return (
            <div>
                <h1>delivered</h1>
                <span> Dish  </span>
                <span> Price </span>
                <span> Status </span>

                {this.state.orderDeliver.map(item => {
                    return (
                        <div>
                            <b>  <span> {item.dish} </span></b>
                            <b>  <span> {item.price} </span></b>
                            <b><span> {item.status} </span></b>
                            <hr />
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        console.log(this.state.orders)
        return (
            <div className='container'>

                <Tabs defaultActiveKey="myscreen" id="uncontrolled-tab-example" >
                    <Tab eventKey="myscreen" title="My Screen" >
                        <br />
                        <RestaurantViewScreen />
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