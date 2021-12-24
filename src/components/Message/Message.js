import React from 'react'
import "./Message.css"

function Message({message,own}) {
    return (
        <div className = {own ? "message own" : "message"}>
            <div className = "messageTop">
            <p className="messageText">{message}</p>
            </div>
        </div>
    )
}

export default Message
