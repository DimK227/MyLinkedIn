import './Conversations.css'
import { Avatar } from '@material-ui/core'

function Conversations({name,photo}) {
    return (
        <div className="conversation">
        {(() => {
            if (photo.length>0) return <img className="conversationImg" src={photo} alt=""/>
            else return <Avatar />    
        })()}
            <span className="conversationName">{name}</span>
        </div>
    )
}

export default Conversations;



