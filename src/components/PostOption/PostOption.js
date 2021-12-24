import React from 'react'
import axios from "axios"
import "./PostOption.css";

function PostOption({Icon, title, color, postId}) {

   


    return (
        <div className = "postOption">
            <Icon  style={{color: color}}/>
            <h4>{title}</h4>
        </div>
    )
}

export default PostOption
