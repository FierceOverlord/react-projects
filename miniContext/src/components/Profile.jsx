import React, {useContext} from 'react'
import UserContext from '../context/userContext'

function Profile() {
    const {user} = useContext(UserContext)

    if(!user) return <div>Please Log in</div>
    

    return (
        <div>Welcone {user.username}</div>
    )
}

export default Profile