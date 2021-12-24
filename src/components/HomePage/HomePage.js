import React from "react";
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import {Navbar,Container,Nav} from 'react-bootstrap'
import './HomePage.css';
import axios from "axios";
import { useLocation, BrowserRouter, BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Network from '../Network/Network'
import Advertisements from "../Advertisements/Adverisements";
import Notifications from '../Notifications/Notifications'
import Personal_Info from '../Personal_Info/Personal_Info'
import Settings from '../Settings/Settings'
import {withRouter,useHistory} from "react-router-dom"
import NavbarComp from "../Navbar/NavbarComp";
import Left from "../Left/Left"
import Center from "../Center/Center"
import ProtectedRoute from "../ProtectedRoute";
import Comment from "../Comment/Comment"
import Messenger from "../Messenger/Messenger";


function HomePage() {

     let flag = false;
     let history = useHistory();
     const location = useLocation();
     const path = location.pathname;

     const [imagesrc, setImagesrc] = useState("");

    
    let id = 0;
    let name = '';
    let email ='';
    let photo = '';
    
    if (path === "/homepage" && typeof location.state !== 'undefined') {
         id = location.state.id;
         name = location.state.name;
         email = location.state.email;
         photo = location.state.photo;
         localStorage.setItem('id', id);
         localStorage.setItem('name', name);
         localStorage.setItem('email', email);
         localStorage.setItem('photo', photo);
    } 
    else {
        id = localStorage.getItem('id');
    }
   
    
    let i = false;
    let profile = localStorage.getItem('photo');


    if (window.performance) {
        if (performance.navigation.type == 1) {
            i = true;
        }  
   }

   const logout = () => {
       history.push('/',true);                
   }

   const f1 = () => {
    history.push('/homepage/personal_info', true)
   }

    if (path === "/homepage"){
        flag = true;
    }
    else flag = false;
    return (
        <div className = "page">
            <Router>
                <Switch>
                    <Route path = "/homepage/comments" component={Comment}/>
                    <Route path = "/homepage/network" component={Network}/>
                    <Route path = "/homepage/advertisements" component={Advertisements}/>
                    <Route path = "/homepage/messenger" component={Messenger}/>
                    <Route path = "/homepage/notifications" component={Notifications}/>
                    <Route path = "/homepage/personal_info" id ={id} component={Personal_Info}  />
                    <Route path = "/homepage/settings" component={Settings}/>
                     <div class="navbar2">
                        <a href = "/homepage" id = "homepage" >Homepage</a>
                        <a href = "/homepage/network" id = "network" >Network</a>
                        <a href = "/homepage/advertisements" id = "advertisements" >Advertisements</a>
                        <a href = "/homepage/messenger" id = "messenger" >Messenger</a>
                        <a href = "/homepage/notifications" id = "notifications" >Notifications</a>
                        <a href = "/homepage/personal_info" id = "personal_info">Personal information</a>
                        <a href = "/homepage/settings" id = "settings" >Settings</a>   
                    </div>
                </Switch>
            </Router>
            <button id="logout" onClick ={ logout}>Logout</button>
            <div class = "container">
                <ProtectedRoute path="/homepage" component={Center} isAuth={flag}/>
                <ProtectedRoute path="/homepage" component={Left} isAuth={flag}/>
            </div>    
        </div>
    );
}



export default withRouter(HomePage);