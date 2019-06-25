import React, { Component } from 'react';
import { db, auth } from '../config/firebase'
import firebase from 'firebase';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Form, Col, Button, Row, CloseButton } from 'react-bootstrap'


class User_Reg extends Component {
    constructor(props) {
        super(props);
        this.state = {

            name: '',
            email: '',
            password: '',
            repassword: '',
            gender: "",
            age: 0,
            country: '',
            city: '',
            users: {}



        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.writeUserData = this.writeUserData.bind(this)

    }

    handleChange(e) {
        // console.log(e.target.value)
        this.setState({ [e.target.name]: e.target.value })

    }

    handleSubmit(e) {

        // console.table(this.state)
        let { name, email, password, repassword, gender, age, country, city } = this.state;
        if (name.length === 0) {

            NotificationManager.info('Enter full name');
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
        else if (age === 0) {
            // alert('Enter age')
            NotificationManager.info('Enter age');
        }
        else if (gender.length === 0) {
            // alert('Select gender')
            NotificationManager.info('Select gender');
        }

        else if (true) {

            let users = { name, email, password, gender, age, country, city }
            // console.log(users)

            this.setState({ users: users })

            console.log('ye wala', this.state.users)
            this.writeUserData(users);

        }
        // if (true) {

        //     let users = this.state.users
        //     console.log('last one', users)
        //     alert('writting data to db')
        //     this.writeUserData();
        // }






        // console.log('outer', this.state.users)



        // console.log(this.state.users)
        e.preventDefault()
    }



    writeUserData = (users) => {

        console.table(users)
        console.log(users.email, users.password)
        var email = users.email;
        var password = users.password

        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                var userInfo = auth.currentUser;


                db.collection("users").doc(userInfo.uid).set({
                    users
                })
                    .then(() => {
                        console.log("Document successfully written!");
                        console.log(this.props)
                        NotificationManager.success('User successfully registered', 'Done!');

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
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                NotificationManager.error(errorMessage, 'Try again!', 5000)
                // ...
                // alert(errorMessage)
                // alert(errorCode)
            });

        var userInfo = auth.currentUser;
        console.log(userInfo)



        // alert('DATA SAVED')




    }

    getUserData = () => {
        // console.log('getUserData')
    }

    componentDidMount() {
        // this.getUserData()
    }

    // componentDidUpdate(prevProps, prevState) {

    //     if (prevState !== this.state) {
    //         this.writeUserData()
    //     }
    // }



    render() {
        // console.table(this.state)
        // console.log(this.state.users)

        return (
            <div>


                <br />
                <div>
                    <Form onSubmit={this.handleSubmit} className='shadow p-3 mb-5 bg-white rounded' >
                        <h1 >User Registration</h1>
                        <br />
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridFullName">

                                <Form.Control type="text" name='name' placeholder="Full Name" onChange={this.handleChange} />
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

                            <Form.Group as={Col} controlId="formGridAge">

                                <Form.Control type="number" name='age' placeholder="Enter age" onChange={this.handleChange} />
                            </Form.Group>


                            <Form.Group as={Col} style={{ marginLeft: '15px' }} >

                                <Row sm={10} >
                                    <Form.Check
                                        type="radio"
                                        label="Male"
                                        name="gender"
                                        id="male"
                                        value='male'
                                        onChange={this.handleChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Female"
                                        name="gender"
                                        id="female"
                                        value='female'
                                        onChange={this.handleChange}
                                    />

                                </Row>
                            </Form.Group>



                        </Form.Row>





                        {/* 
                        <Form.Group id="formGridCheckbox">
                            <Form.Check type="checkbox" label="I agree to FOOD NOW's Terms of Service, Privacy Policy and Content Policies" />
                        </Form.Group> */}


                        <Button variant="danger" type="submit"  >Submit</Button>

                        <NotificationContainer />


                    </Form>
                </div>
            </div>
        );
    }
}

export default User_Reg;