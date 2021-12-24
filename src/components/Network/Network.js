import React, { useState, useEffect } from 'react'
import axios from "axios";
import InfoUser from '../InfoUser/InfoUser';
import ProtectedRoute from '../ProtectedRoute';
import { useHistory, useLocation, BrowserRouter, BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import './Network.css'


function Network() {

    let user_id = localStorage.getItem('id');
    
    const [search, setSearch] = useState('');
    const [name, setName] = useState('')
    const [id, setId] = useState('');
    const [friends, setFriends] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    let history = useHistory();
     const location = useLocation();
     const path = location.pathname;

    let flag = false;
      if (path === "/homepage/network"){
         flag = true;
     }

    
    const searchuser = (event) => {
        event.preventDefault();
        var words = search.split(" ");
        var name = words[0];
        var surname = words[1];
        const data = {name: name, surname: surname};
        axios.post("http://localhost:3001/search", data).then((response)=> {
             setSearchResults(response.data);
         })
    }

    useEffect(() => {
        const data = {user_id: user_id};
        axios.post("http://localhost:3001/getfriends", data).then((response)=> {
            setFriends(response.data);
         })
     }, [])

    if (flag) {
        return (
            <div>
                <div class="navbar2">
                        <a href = "/homepage" id = "homepage" >Homepage</a>
                        <a href = "/homepage/network" id = "network" >Network</a>
                        <a href = "/homepage/advertisements" id = "advertisements" >Advertisements</a>
                        <a href = "/homepage/messenger" id = "messenger" >Messenger</a>
                        <a href = "/homepage/notifications" id = "notifications" >Notifications</a>
                        <a href = "/homepage/personal_info" id = "personal_info">Personal information</a>
                        <a href = "/homepage/settings" id = "settings" >Settings</a>   
                    </div>
                <Route exact path = "/homepage/network/userinfo" component={InfoUser}/>
                <div id = "search">
                <input  type = "text" name = "search" placeholder = "search for a user" onChange={(event) => {setSearch(event.target.value)}}></input>
                <button onClick = {searchuser} type = "submit">search</button>
                </div>
                {searchResults.map((val) => {
                    return (<div>
                        <img src = {val.photo} height ="50"></img>
                        <h4>
                            <Link  to = {'/homepage/network/userinfo?id=' + val.id} >{val.name + " " + val.surname}</Link>
                            </h4>
                    </div>) 
                })}
                <div id = "listOfFirends"> 
                    <h3>Your friends are:</h3>
                    {friends.map((val) => { 
                        if (val.user1== user_id) {
                            return (
                            
                                <div> <h4> <Link className = "friend" to = {'/homepage/network/userinfo?id=' + val.user2} >{val.user2_name}</Link> </h4> </div>
                            )
                        }
                        else {
                            return (
                                
                                    <div> <h4> <Link className = "friend" to = {'/homepage/network/userinfo?id=' + val.user1} >{val.user1_name}</Link> </h4> </div>
                            )
                        }
                    })}
                </div>
            </div>
        )
    }
    else {
       return ( <div>
           <div class="navbar2">
                <a href = "/homepage" id = "homepage" >Homepage</a>
                <a href = "/homepage/network" id = "network" >Network</a>
                <a href = "/homepage/advertisements" id = "advertisements" >Advertisements</a>
                <a href = "/homepage/messenger" id = "messenger" >Messenger</a>
                <a href = "/homepage/notifications" id = "notifications" >Notifications</a>
                <a href = "/homepage/personal_info" id = "personal_info">Personal information</a>
                <a href = "/homepage/settings" id = "settings" >Settings</a>   
            </div>
            <Route exact path = "/homepage/network/userinfo" component={InfoUser}/>
            </div>)
    }
}

export default Network;


