import React, { Component } from 'react'
import { useState, useEffect } from 'react';
import './NavbarComp.css';
import {Navbar,Container,Nav} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { useHistory, useLocation } from "react-router-dom";
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import HomePage from '../HomePage/HomePage';
import ProtectedRoute from '../ProtectedRoute';
import AdminPage from '../AdminPage/AdminPage';
import Confirmation from '../Confirmation/Confirmation';




function NavbarComp(){
        return (
            <Router>
          
              <Switch>
                  
                <Route exact path="/Login" component={Login}/>
                <Route path = "/Sign-Up" component={SignUp}/>
                <Route path = "/homepage" component={HomePage}/>
                <Route path = "/admin" component={AdminPage}/>
                <Route path = "/cofirmation" component={Confirmation}/>
                {/* <ProtectedRoute path = "/homepage" component={HomePage} isAuth={false}/> */}
                <div>
                <Navbar bg="light" expand="lg">
                <div>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="/" id = "Home" >LinkedIn</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Router>
                                <Nav className="me-auto">
                                    <a href = "/Login" id = "Log-In" >Login</a>
                                    <a href = "/Sign-Up" id = "Sign-Up" >SignUp</a>
                                    
                                </Nav>
                            </Router>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
             
                

                </Navbar>
               
                </div>
          
              </Switch>
        </Router>
        )
}

export default NavbarComp;