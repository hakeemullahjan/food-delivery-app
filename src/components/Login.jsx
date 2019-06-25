import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Form, Col, Button, Row, CloseButton } from 'react-bootstrap'
import { auth } from '../config/firebase'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit(e) {
        // alert('handleSubmit')
        let { email, password } = this.state;

        if (email.length === 0) {
            // alert('Enter  email!')
            NotificationManager.warning('Enter email');
        }
        else if (password.length === 0) {
            // alert('Enter password')
            NotificationManager.warning('Enter password');
        }
        else if (email.length !== 0 && password.length !== 0) {
            // alert('active')
            this.signInUser(email, password)

        }


        e.preventDefault()
    }


    signInUser(email, password) {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("User successfully loggedin");
                console.log(this.props)
                NotificationManager.success('User successfully logged In', 'Done!');

                setTimeout(() => {
                    this.props.history.push('/home')
                }, 4000)
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                NotificationManager.error(errorMessage, 'Try again!', 5000)
            });
    }


    render() {
        console.log(this.state.email, this.state.password)
        return (
            <div >
                <br />


                <div>
                    <Form onSubmit={this.handleSubmit} className='shadow p-3 mb-5 bg-white rounded'>
                        <h1>Login</h1>
                        <br />

                        <Form.Group controlId="formBasicEmail">

                            <Form.Control type="email" name='email' placeholder="Enter email" onChange={this.handleChange} />

                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">

                            <Form.Control type="password" name='password' minLength='6' placeholder="Password" onChange={this.handleChange} />
                        </Form.Group>


                        <Button variant="danger" type="submit">Submit</Button>

                    </Form>
                </div>

                <NotificationContainer />


            </div>
        );
    }
}

export default Login;