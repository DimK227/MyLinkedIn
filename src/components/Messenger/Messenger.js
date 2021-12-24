// import { ChatEngine } from 'react-chat-engine'
import './Messenger.css'
import React, { useState, useEffect } from 'react'
import Conversations from '../Conversations/Conversations'
import Message from '../Message/Message'
import axios from "axios"
import ReactScrollableFeed from 'react-scrollable-feed'

function Messenger() {

    const [messages, setMessages] = useState([])
    const [conversations, setConversations] = useState([])
    const [convExist, setConvExist] = useState(0);
    const [input, setInput] = useState('');
    const [to_id, setTo_id] = useState(0);
    const [to_name, setTo_name] = useState('')
    const [count, setCount] = useState(0);

    let counter = 0;

    let user_id = localStorage.getItem('id');
    let from_name = localStorage.getItem('name');

    useEffect(() => {
        const data = {user1_id: user_id};
        axios.post("http://localhost:3001/getconv", data).then((response) => {
            setConversations(response.data);
        })
     }, [])

     useEffect(() => {
         const data = {from_id: user_id, to_id: to_id};
        axios.post("http://localhost:3001/getmessages", data).then((response) => {
            setMessages(response.data);
        })

     })

     const SelectConv = (name,id) => {
         setConvExist(1);
         setTo_name(name);
         setTo_id(id);
     }

     const SendMessage = () => {
            const data = {from_id: user_id, to_id: to_id, from_name: from_name, to_name: to_name, message:input};
            axios.post("http://localhost:3001/sendmessage", data).then((response) => {  
            })
            setInput('')
     }

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
       <div className = "messenger">
           
           <div className="chatMenu">
                <div className="chatMenuWrapper">
                    {conversations.map((val) => {
                        if (from_name=== val.user2_name) {
                             return (
                            <div onClick = {() => SelectConv(val.user1_name, val.user1_id)}>
                                <Conversations name = {val.user1_name} photo = {val.user1_photo}/>
                            </div>);
                         }
                        else return (
                            <div onClick = {() => SelectConv(val.user2_name,val.user2_id)}>
                            <Conversations name = {val.user2_name} photo = {val.user2_photo}/>
                        </div>);
                     })}
                    
                </div>    
           </div>
            <div className="chatBox">
               <div className = "chatBoxWrapper">
               {
                   convExist ?
                    <>
                   <div className = "chatBoxTop">
                        <ReactScrollableFeed>
                        {messages.map((val) => {
                            if (val.from_id== user_id) {
                                return (<Message message ={val.message} own={false}/>);
                            }
                            else return (<Message message ={val.message} own={true}/>);
                        })}
                        </ReactScrollableFeed>
                   </div>
                   <div className = "chatBoxBottom">
                       <textarea className = "chatMessageInput" placeholder = "write something"  value = { input } name = 'input' 
                                onChange={(event) => {setInput(event.target.value)}}>
                       </textarea>
                       <button onClick = {SendMessage} classNme="chatSubmitButton">Send</button>
                   </div> </> : <span>Choose a Conversation</span>}
               </div>
           </div>
           <div className=" chatOnline"></div>
       </div>
       </div>
    )
}

export default Messenger

