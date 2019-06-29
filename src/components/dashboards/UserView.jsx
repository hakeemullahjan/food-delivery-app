import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Tabs, Tab, Sonnet, Row, Col, Nav, Button, ButtonToolbar, Card } from 'react-bootstrap'
import { MDBCol, MDBFormInline, MDBBtn, MDBIcon } from "mdbreact";

import { db,auth } from '../../config/firebase'

import img1 from '../../assets/download.jpg'

import RestaurantViewScreen from '../detailscreen/RestaurantViewScreen.jsx'

class UserView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            text: '',
            result: [],
            toggle: false,
            restuid: 0,
            orders:[],
            orderProgress:[],
            orderDeliver:[]
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        db.collection('restaurants').get()
            .then(snap => {
                console.log(snap.docs)
                snap.docs.forEach(doc => {
                    // console.log(doc.data().restaurants)
                    console.log(doc.id)
                    let rest = this.state.restaurants;
                    rest.push(doc.data().restaurants)
                    this.setState({ restaurants: rest })

                    // console.log(doc.id)
                    // console.log(doc.data().name)
                })
            })

            db.collection('orders').get()
            .then(snap => {
                console.log(snap.docs)
                snap.docs.forEach(doc => {
                    // console.log(doc.data().restaurants)
                    var useruid=auth.currentUser.uid
                    console.log(useruid)
                    console.log(doc.id)
                    console.log(doc.data())
                    if(useruid===doc.data().useruid && doc.data().status==='pending'){
                        let ord = this.state.orders;
                        ord.push(doc.data())
                        this.setState({ orders: ord })
                    }
                    if(useruid===doc.data().useruid && doc.data().status==='inprogress'){
                        let ord = this.state.orderProgress
                        ord.push(doc.data())
                        this.setState({ orderProgress: ord })
                    }
                    if(useruid===doc.data().useruid && doc.data().status==='delivered'){
                        let ord = this.state.orderDeliver
                        ord.push(doc.data())
                        this.setState({ orderDeliver: ord })
                    }

                    
                    

                    // console.log(doc.id)
                    // console.log(doc.data().name)
                })
            })

        

    }

    handleSearch(e) {
        console.log(e.target.value)
        console.log('', e.target.value)
        const text = e.target.value
        console.log(text)
        this.setState({ text: text })

        let result = this.state.restaurants.filter((elem) => {
            return elem.restName.toLowerCase().substring(0, text.length) === text
        })


        this.setState({ result: result })
        console.log(result)


    }
    detailScreec(uid){
        localStorage.setItem('restuid', uid)
        this.props.history.push('./userviewscreen')
    }


    Restaurants() {
        const { restaurants, result, text } = this.state;
        const arr = text.length ? result : restaurants;
        // console.log(arr)
        // console.log(this.state.restaurants)
        return (
            <div>
                {/* <h1>Restaurants</h1> */}



                <div style={{ textAlign: 'center' }}>

                    <MDBCol md="6" style={{ display: 'inline-block' }}>
                        <div className="active-pink-3 active-pink-4 mb-4">
                            <input className="form-control" type="text" placeholder="Search for restaurants..." aria-label="Search" onChange={e => this.handleSearch(e)} />
                        </div>
                    </MDBCol>
                    <br />
                    <ButtonToolbar style={{ display: 'inline-block' }} >

                        <Button variant="outline-danger" size='sm'>BBQ</Button>
                        <Button variant="outline-danger" size='sm'>Chinese</Button>
                        <Button variant="outline-danger" size='sm'>Indian</Button>
                        <Button variant="outline-danger" size='sm'>Fast Food</Button>
                        <Button variant="outline-danger" size='sm'>Turkish</Button>
                        <Button variant="outline-danger" size='sm'>Italian</Button>
                        <Button variant="outline-danger" size='sm'>Pizza</Button>
                        <Button variant="outline-danger" size='sm'>Desserts</Button>
                        <Button variant="outline-danger" size='sm'>American</Button>



                    </ButtonToolbar>

                </div>
                <hr />
                <div id='category' >
                    {arr.map((item) => {
                        return (
                            <div>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={item.imgURL} />
                                    <Card.Body>
                                        <Card.Title>{item.restName}</Card.Title>
                                        <Card.Text>
                                            {item.foodCategories.map((i) => { return (<span> {i},</span>) })}
                                        </Card.Text>
                                        <Button variant="danger" onClick={this.detailScreec.bind(this, item.uid)}>Detail</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        )

                    })}

                </div>

            </div>
        );
    }



    MyRequest() {
        return (
            <div>
                {/* <h1>My Requests</h1> */}
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first" variant="danger">Pending</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">In progress</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Delivered</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                   

                             {this.Pending()}
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    {/* <h1>in progress</h1> */}
                                    {this.InProgress()}
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                              {/* <h1>delivered</h1> */}
                              {this.Delivered()}
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        );
    }
    Pending(){
        
        return(
            <div>
                <h1>pending</h1>
                <span> Dish  </span>
                <span> Price </span>
                <span> Status </span>
 
              {this.state.orders.map(item=>{
                  return(
                      <div>
                      <b>  <span> {item.dish} </span></b>  
                      <b>     <span> {item.price} </span></b>
                      <b>  <span> {item.status} </span></b>
<hr/>
                      </div>
                  )
              })}
            </div>
        )
    }
    InProgress(){
        return(
            <div>
                <h1>in progress</h1>
                <span> Dish  </span>
                <span> Price </span>
                <span> Status </span>
 
              {this.state.orderProgress.map(item=>{
                  return(
                      <div>
                         <b> <span> {item.dish} </span> </b>
                         <b>  <span> {item.price} </span></b>
                         <b><span> {item.status} </span></b>
                          <hr/>
                      </div>
                  )
              })}
            </div>
        )
    }
    Delivered(){
        return(
            <div>
                <h1>delivered</h1>
                <span> Dish  </span>
                <span> Price </span>
                <span> Status </span>
 
              {this.state.orderDeliver.map(item=>{
                  return(
                      <div>
                      <b>    <span> {item.dish} </span></b>
                      <b>  <span> {item.price} </span></b>
                      <b> <span> {item.status} </span></b>
                          <hr/>
                      </div>
                  )
              })}
            </div>
        )
    }

    render() {
        console.log(this.state.restaurants)
        console.log(this.state.orders)
        console.log(this.state.orderDeliver)
        console.log(this.state.orderProgress)
        return (
            <div className='container'>
                {/* <h1>USER VIEW</h1> */}
                <Tabs defaultActiveKey="restaurants" id="uncontrolled-tab-example" >
                    <Tab eventKey="restaurants" title="Restaurants" >
                        <br />
                        {this.Restaurants()}
                    </Tab>
                    <Tab eventKey="myrequest" title="My Requests">
                        <br />
                        {this.MyRequest()}
                    </Tab>

                </Tabs>

                
            </div>
        );
    }
}

export default UserView;