import React, { Component } from 'react';
import { Form, Col, Button, Row, CloseButton, Card } from 'react-bootstrap'
import { auth, db } from '../../config/firebase'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
// import { Tabs, Tab, Sonnet, Row, Col, Nav, Button, ButtonToolbar, Card } from 'react-bootstrap'
import img1 from '../../assets/download.jpg'



class RestaurantViewScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodCat: [],
            restaurants: {},
            price: 0,
            dish: '',
            dishes: {},
            dishesArray: [],
            dishCat:[],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDishes = this.handleDishes.bind(this);
        this.handleDishesSubmit = this.handleDishesSubmit.bind(this)
    }

    handleChange(e) {
        console.log(e.target.checked)
        console.log(e.target.name)
        console.log(e.target.value)
        let foodCat = this.state.foodCat;
        let food = e.target.value;

        // if (!foodCat.includes(food)) {
        //     foodCat.push(food);
        //     this.setState({ foodCat: foodCat })
        // }
        if (e.target.checked && !foodCat.includes(food)) {
            foodCat.push(food);
            this.setState({ foodCat: foodCat })
        }


        // this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(e) {

        console.log(this.state.foodCat)
        let foodCategories = this.state.foodCat;

        console.log(this.state.restaurants)
        let restaurants = this.state.restaurants
        restaurants['foodCategories'] = foodCategories
        console.log(restaurants)

        var restaurantInfo = auth.currentUser;
        db.collection("restaurants").doc(restaurantInfo.uid).set({
            restaurants
        })
            .then(() => {
                console.log("Document successfully written!");
                // console.log(this.props)
                NotificationManager.success('Food Categories added', 'Done!');



            })
            .catch((error) => {
                console.error("Error writing document: ", error);
                NotificationManager.error('Something went wrong', 'Try again!', 5000)
                // alert('error')
            });




        e.preventDefault()
    }
    componentDidMount() {

        db.collection('restaurants').get()
            .then(snap => {
                // console.log(snap.docs)
                let info = auth.currentUser

                snap.docs.forEach(doc => {
                    // console.log(doc.data().restaurants)
                    // console.log(doc.id)
                    // console.log(doc.data().restaurants)
                    if (info.uid === doc.id) {
                        this.setState({ restaurants: doc.data().restaurants })
                        this.setState({ dishCat: doc.data().restaurants.dishes })
                    }
                    // let rest = this.state.restaurants;
                    // rest.push(doc.data().restaurants)
                    // this.setState({ restaurants: rest })


                    // console.log(doc.id)
                    // console.log(doc.data().name)
                })
            })



    }

    handleDishes(e) {
        this.setState({ [e.target.name]: e.target.value })

    }
    handleDishesSubmit(e) {
        let dish = this.state.dish;
        let price = this.state.price;

        let dishes = this.state.dishes

        dishes.dish = dish;
        dishes.price = price
        // alert(dishes)
        console.log(dishes)

        let dishesArray = this.state.dishesArray
        dishesArray.push(dishes)
        console.log(dishesArray)

        let restaurants = this.state.restaurants
        // restaurants['dishes'] = dishesArray
        restaurants.dishes.push(dishes)
        console.log(restaurants)

        var restaurantInfo = auth.currentUser;
        db.collection("restaurants").doc(restaurantInfo.uid).set({
            restaurants
        })
            .then(() => {
                console.log("Document successfully written!");
                // console.log(this.props)
                NotificationManager.success('Dish added successfully', 'Done!');



            })
            .catch((error) => {
                console.error("Error writing document: ", error);
                NotificationManager.error('Something went wrong', 'Try again!', 5000)
                alert('error')
            });





        e.preventDefault()
    }


    render() {
        console.log(this.props.myname)
        // console.log(this.state.foodCat)
        console.log(this.state.restaurants.dishes)
        // console.log(this.state.dish, this.state.price)
        console.log(this.state.dishCat)
        return (
            <div className='container'>
                {/* <h1>My screen</h1> */} <br />
                <Form onSubmit={this.handleSubmit} className='shadow p-3 mb-5 bg-white rounded'>
                    <h4>Food Categories</h4>
                    <Form.Row>
                        <Form.Group>
                            <div className="mb-3">
                                <Form.Check inline label="BBQ" type='checkbox' value='BBQ' onChange={this.handleChange} name='foodCat' />
                                <Form.Check inline label="Fast Food" type='checkbox' value='Fast Food' onChange={this.handleChange} name='foodCat' />
                                <Form.Check inline label="Chinese" type='checkbox' value='Chinese' onChange={this.handleChange} name='foodCat' />
                                <Form.Check inline label="Japanese" type='checkbox' value='Japanese' onChange={this.handleChange} name='foodCat' />
                                <Form.Check inline label="Indian" type='checkbox' value='Indian' onChange={this.handleChange} name='foodCat' />
                                <Form.Check inline label="Italian" type='checkbox' value='Italian' onChange={this.handleChange} name='foodCat' />
                                <Form.Check inline label="American" type='checkbox' value='American' onChange={this.handleChange} name='foodCat' />
                            </div>
                        </Form.Group>
                    </Form.Row>
                    <Button variant="danger" type="submit"  >Submit</Button>
                </Form>


                <Form onSubmit={this.handleDishesSubmit} className='shadow p-3 mb-5 bg-white rounded' >

                    <h4>Main Dishes of Your Restaurant</h4>
                    <br />
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCounty">

                            <Form.Control as="select" name='dish' onChange={this.handleDishes} >
                                <option selected disabled >Dishes...</option>
                                <option value='Karahi'>Karahi</option>
                                <option value='Tikka'>Tikka</option>
                                <option value='Nihari'>Nihari</option>
                                <option value='Barbeque'>Barbeque</option>
                                <option value='Biryani'>Biryani</option>
                                <option value='Chargha'>Chargha</option>
                                <option value='Katakat'>Katakat</option>
                                <option value='Handi'>Handi</option>
                                <option value='Kofta'>Kofta</option>
                                <option value='Chicken Malai Boti'>Chicken Malai Boti</option>



                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">

                            <Form.Control type="number" name='price' placeholder="Enter price" onChange={this.handleDishes} />
                        </Form.Group>

                    </Form.Row>




                    <Button variant="danger" type="submit"  >Submit</Button>




                </Form>
                <hr />

                <h1>MY RESTAURANT DISHES</h1>
                {/* <p>{this.state.restaurants.dishes[0]}</p> */}

                <div id='category' >
                    {this.state.dishCat.map((item) => {
                        return (
                            <div>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={img1} />
                                    <Card.Body>
                                        <Card.Title>{item.dish}</Card.Title>
                                        <Card.Text>
                                            {item.price} PKR
                             </Card.Text>
                                        <Button variant="danger">Edit</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        )

                    })}
                </div>





                <NotificationContainer />

            </div>
        );
    }
}

export default RestaurantViewScreen;