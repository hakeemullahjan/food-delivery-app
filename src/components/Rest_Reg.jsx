import React, { Component } from 'react';
import { db, auth, storage } from '../config/firebase'
import firebase from 'firebase';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Form, Col, Button, Row, CloseButton } from 'react-bootstrap'


class Rest_Reg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            repassword: '',
            country: '',
            city: '',
            restName: '',
            img: null,
            url: '',
            progress: 0,
            restaurants: {}

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        // console.log(e.target.value)
        this.setState({ [e.target.name]: e.target.value })

        if (e.target.files) {
            console.log(e.target.files[0])
            var img = e.target.files[0]
            this.setState({ img: img })
        }

    }

    handleSubmit(e) {

        // console.table(this.state)
        let { name, email, password, repassword, country, city, restName, img } = this.state;

        if (name.length === 0) {

            NotificationManager.info('Enter restaurant name');
            // alert('Enter full name!')
        }
        else if (email.length === 0) {
            // alert('Enter  email!')
            NotificationManager.info('Enter email');
        }
        else if (password.length === 0) {
            // alert('Enter password')
            NotificationManager.info('Enter password');
        }
        else if (repassword.length === 0) {
            // alert('Enter repassword')
            NotificationManager.warning('Confirm your password');
            // NotificationManager.info('Confirm your password');
        }
        else if (repassword !== password) {
            NotificationManager.error('Those passwords didn\'t match', 'Try again!', 5000)
            // alert('Password didn\'t match!')
        }
        else if (country.length === 0) {
            // alert('Select country');
            NotificationManager.info('Select country');
        }
        else if (city.length === 0) {
            // alert('Enter city')
            NotificationManager.info('Enter city');
        }
        else if (restName.length === 0) {
            NotificationManager.info('Enter restaurant name');
        }
        else if (!img) {
            NotificationManager.warning('Upload picture');
        }


        else if (true) {

            let restaurants = { name, email, password, country, city, restName }
            // console.log(users)

            this.setState({ restaurants: restaurants })

            console.log('ye wala', this.state.restaurants)
            this.writeRestaurantData(restaurants, img);

        }

        e.preventDefault()

    }

    writeRestaurantData = (restaurants, img) => {



        var email = restaurants.email;
        var password = restaurants.password

        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {

                let uploadTask = storage.ref(`restaurants/${img.name}`).put(img);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes)*100)
                        this.setState({progress})
                    },
                    (error) => {
                        // console.log(error)
                        NotificationManager.error(error, 'Try again!', 5000)

                    },
                    () => {
                        storage.ref('restaurants').child(img.name).getDownloadURL().then(url => {
                            console.log(url)
                            restaurants.imgURL = url



                            var restaurantInfo = auth.currentUser;
                            db.collection("restaurants").doc(restaurantInfo.uid).set({
                                restaurants
                            })
                                .then(() => {
                                    console.log("Document successfully written!");
                                    console.log(this.props)
                                    NotificationManager.success('Restaurant successfully registered', 'Done!');

                                    setTimeout(() => {
                                        this.props.history.push('/login')
                                    }, 4000)


                                })
                                .catch((error) => {
                                    console.error("Error writing document: ", error);
                                    NotificationManager.error('Something went wrong', 'Try again!', 5000)
                                    // alert('error')
                                });






                        })
                    }

                )






            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                NotificationManager.error(errorMessage, 'Try again!', 5000)
                // ...
                // alert(errorMessage)
                // alert(errorCode)
            });




        // alert('DATA SAVED')



    }


    render() {
        // console.log(this.state.img)
        return (
            <div className='container'>
<br/>
                <br />
                <div>
                    <Form onSubmit={this.handleSubmit} className='shadow p-3 mb-5 bg-white rounded' >
                        <h1 >RESTAURANT REGISTRATION</h1>
                        <br />
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridFullName">

                                <Form.Control type="text" name='name' placeholder="Full name" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridEmail">

                                <Form.Control type="email" name='email' placeholder="Enter email" onChange={this.handleChange} />
                            </Form.Group>

                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPassword">

                                <Form.Control type="password" name="password" placeholder="Password" minLength='6' onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridRePassword">

                                <Form.Control type="password" name="repassword" placeholder="Confirm Password" minLength='6' onChange={this.handleChange} />
                            </Form.Group>

                        </Form.Row>




                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCounty">

                                <Form.Control as="select" name='country' onChange={this.handleChange} >
                                    <option selected disabled >Country...</option>
                                    <option value='pakistan'>Pakistan</option>
                                    <option value='india'>India</option>
                                    <option value='srilinka'>Sri Linka</option>
                                    <option value='bangladesh'>Bangladesh</option>

                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCity">

                                <Form.Control type='text' placeholder='City' name='city' onChange={this.handleChange} />
                            </Form.Group>

                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridFullName">

                                <Form.Control type="text" name='restName' placeholder="Restaurant name" onChange={this.handleChange} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group>
                                <input type="file" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group>
                                <progress value={this.state.progress} max='100' />
                            </Form.Group>
                        </Form.Row>




                        <Button variant="danger" type="submit"  >Submit</Button>

                        <NotificationContainer />


                    </Form>
                </div>

            </div>
        );
    }
}

export default Rest_Reg;