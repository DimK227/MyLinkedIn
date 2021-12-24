import { Avatar } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import "./Left.css"
//const { Container } = require("react-bootstrap")


function Left() {

    let photo = localStorage.getItem('photo');
  

    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    return (
        <div>
           <div class="leftside">
                <div className="personal">
                {(() => {
                    if (photo.length>0) {
                        return (
                            <div>
                                <img className="ProfileImg" src ={photo} height ="80"></img>
                            </div>
                        )
                    } 
                    else {
                        return (
                            <Avatar />
                        )      
                    }
                })()} 
                    <h2>{name}</h2>
                    <h2>{email}</h2>
                </div>
           </div>
        </div>
    )
}

export default Left
