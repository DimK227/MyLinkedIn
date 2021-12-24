import React from 'react'
import './NewComment.css'
import Avatar from '@material-ui/core/Avatar';

function NewComment(name, message, photoURL) {
    return (
        <div>
            <div className = "post">
            <div className = "post_header">
                <Avatar />
                <div className="post_info">
                    <h2>{name}</h2>
                    {/* <p>{description}</p> */}
                </div>
            </div>
            <div className="post_body">
                <p>{message}</p>
            </div>
        </div>
        </div>
    )
}

export default NewComment
