/* IMPORT HOOKS */
import { useState, useEffect } from "react"

/* IMPORT PACKAGES */
import axios from "axios"

/* IMPORT COMPONENTS */
import NavBar from '../components/NavBar'
import Forbidden from '../components/Forbidden'

/* ------------------------------------------------------------------------------------------------- */

// Authorize user with server
const authorize = async (setUser) => {
    try{
        const user = await axios.get('/auth/authorize')
        setUser({
            authorized: true,
            user: user.data,
        })
    }
    catch(error){
        setUser({
            authorized: false,
            user: {},
        })
    }
}

/* ------------------------------------------------------------------------------------------------- */

/* DASHBOARD PAGE */
const Dashboard = () => {

    const [user, setUser] = useState({
        authorized: false,
        user: {},
    })
    useEffect(function (){authorize(setUser)}, [])

    return (
        <div>
            <div>
                {user.authorized ? <NavBar User={user.user}/> : <Forbidden message={{status: 'Forbidden', description: 'You don\'t have access to this page'}}/>}
            </div>  
        </div>
    )
}

export default Dashboard