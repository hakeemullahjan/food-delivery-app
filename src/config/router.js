import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from '../components/Home.jsx'
import User_Reg from '../components/User_Reg.jsx'
import Rest_Reg from '../components/Rest_Reg.jsx'
import Login from '../components/Login.jsx'
import UserView from '../components/dashboards/UserView.jsx'



import {Navbar,Nav,NavDropdown} from 'react-bootstrap'


function Navigation(){
    return(
      <Router>
          <Navbar collapseOnSelect expand="lg" bg="danger" variant="dark">
  <Navbar.Brand href="/">FOOD NOW</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    
    <Nav className="mr-auto">
     
    </Nav>
    <Nav>
     

      <Nav.Link href='/login' >Login</Nav.Link>

      <NavDropdown title="Register" id="collasible-nav-dropdown">
        <NavDropdown.Item href="/userregistration">User</NavDropdown.Item>
        <NavDropdown.Item href="/restaurantregistration">Restaurant</NavDropdown.Item>
      
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>


          <div   >
            <Route exact path='/' component={Home} />
            <Route path='/userregistration' component={User_Reg} />
            <Route path='/restaurantregistration'  component={Rest_Reg} />
            <Route path='/login' component={Login} />
            <Route path='/userview' component={UserView} />
           
          </div>

      </Router>
    )
}



export {Navigation};