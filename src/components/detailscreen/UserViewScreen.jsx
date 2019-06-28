import React, { Component } from 'react';
import { db, auth } from '../../config/firebase'
import { Tabs, Tab, Sonnet, Row, Col, Nav, Button, ButtonToolbar, Card } from 'react-bootstrap'
import img1 from '../../assets/download.jpg'

class UserViewScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restData: {},
            dishes: []
        };
    }

    componentDidMount() {
        let restuid = localStorage.getItem('restuid')
        console.log(restuid);
        db.collection('restaurants').doc(restuid).get()
            .then(snap => {
                console.log(snap.data().restaurants)
                this.setState({ restData: snap.data ().restaurants })
                this.setState({ dishes: snap.data().restaurants.dishes })
            })

    }
    orderFood(d,p){
        let restuid = localStorage.getItem('restuid')
        let useruid = auth.currentUser.uid
        console.log(useruid,restuid)
        let data={}
        data.useruid=useruid;
        data.restuid=restuid;
        data.status='pending'
        data.price=p
        data.dish=d
        db.collection('orders').doc(useruid+restuid).set(data)
        .then(()=>{
            alert('order done')
        })       
    }


    render() {
        console.log(this.state.restData)
        console.log(this.state.dishes)
        return (
            <div className='container'>
                <br />
                <h1>{this.state.restData.restName}</h1>
                <hr/>
                <div id='category' >
                    {this.state.dishes.map((item) => {
                        var dish=item.dish
                        var price=item.price
                        return (
                            <div>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={img1} />
                                    <Card.Body>
                                        <Card.Title>{item.dish}</Card.Title>
                                        <Card.Text>
                                            {item.price} PKR
                             </Card.Text>
                                        <Button variant="danger" onClick={this.orderFood.bind(this,dish,price)}>Order</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        )

                    })}
                </div>

            </div>
        );
    }
}

export default UserViewScreen;