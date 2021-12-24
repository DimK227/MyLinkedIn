import React, { useState, useEffect } from 'react'
import Post from "../Post/Post"
import axios from 'axios';
import ScrollView from 'react'
import './Notifications.css'

function Notifications() {

    let user_id = localStorage.getItem('id');
    let name = localStorage.getItem('name');

    const [requests, setRequests] = useState([]);
    const [haveIAnswered, setHaveIAnswered] = useState(0);
    const [notifications, SetNotifications] = useState([]);

    useEffect(() => {
        const data = {id: user_id};
        axios.post("http://localhost:3001/getnotifications", data).then((response)=> {
            SetNotifications(response.data);
        })
    })

    
    

    const Accept = (fromId,from_name) => {
        console.log(fromId);
        const data = {fromId: fromId, toId: user_id, from_name: from_name, to_name:name}
        axios.post("http://localhost:3001/acceptrequest", data).then((response)=> {
            console.log("success");
        })
        setHaveIAnswered(1);
    }


    const Reject = (fromId, event) => {
        const data = {fromId: fromId, toId: user_id}
        axios.post("http://localhost:3001/rejectrequest", data).then((response)=> {
            console.log("success");
        })
        setHaveIAnswered(1);
    }

    
    const seen = (id) => {
        const data = {id: id}
        axios.post("http://localhost:3001/seennotification", data).then((response)=> {
        })

    }



    useEffect(() => {
        const data = {user_id: user_id}
        axios.post("http://localhost:3001/getrequests", data).then((response) => {
            setRequests(response.data);
        })
    }, [])

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
            <div >

            <div id = "request_title">
                <h3>THESE ARE YOUR FRIEND REQUESTS </h3>
            </div> 
            
            {requests.map((val)=> (
                
             <div id = "friend_request">
                {(() => {
                    if (!haveIAnswered) {
                        return (
                            <div > 
                            <div><div>{val.from_name}</div> 
                            <div> 
                                <button type = "submit" onClick = {() => Accept(val.fromId, val.from_name)} >Accept friend request</button>
                                
                            </div>
                            <div> 
                                <button type = "submit" onClick = {() => Reject(val.fromId)}>Reject friend request</button>
                            </div></div>
                            </div>
                         )
                    } 
                })()}
            </div>    
            
            
            ))}
            </div>

            <div id = "reaction_title">
                <h3>THESE ARE THE REACTIONS TO YOUR POST </h3>
            </div> 
            <div className = "notification">
                
            
            {notifications.map((val1) => {
                if (val1.type === "like") {
                    return (
                        <div> 
                            {val1.from_name} has liked your post "{val1.post_body}"
                            <button onClick = {() => seen(val1.id)}>seen</button>
                        </div>
                    )
                }
                else return (
                    <div> 
                        {val1.from_name} has commented  "{val1.comment}" on your post "{val1.post_body}"
                        <button onClick = {() => seen(val1.id)}>seen</button>
                    </div>
                );
            })}
            </div>
        </div>
    )
}

export default Notifications;
