import React, { Component } from 'react';
import { auth } from '../config/firebase';
import Slider from '../components/Slider.jsx'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

        auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                console.log('===>', ' User is signed in.')
                console.log(user)
            } else {
                // No user is signed in.
                console.log('====>', 'No user is signed in.')
            }
        });
    }


    render() {
        return (
            <div>
                {/* <h1>HOME</h1> */}
                <Slider />

            </div>
        );
    }
}

export default Home;