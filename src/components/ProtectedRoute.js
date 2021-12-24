import React from 'react'
import {Route, Redirect} from 'react-router-dom'

function ProtectedRoute({isAuth: isAuth, component: Component, id: id, ...rest}) {
    return (
        <Route {...rest} render={(props)=>{
            if (isAuth) {
                return <Component/>;
                <h4>{id}</h4>
            }
            // else {
            //     return (
            //     <Redirect to = {{pathname: '/', state: {from: props.location}}} />
            //     );
            // }

            // if (window.auth) {
            //     return <Component/>;
            // }
            // else {
            //     return (
            //     <Redirect to = {{pathname: '/', state: {from: props.location}}} />
            //     );
            // }
        }}/>
    )
}

export default ProtectedRoute
