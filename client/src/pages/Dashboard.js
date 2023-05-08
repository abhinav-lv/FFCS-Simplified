import axios from "axios"
import { useState, useEffect } from "react"
import NavBar from '../components/NavBar'

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

const Dashboard = () => {

    const [user, setUser] = useState({
        authorized: false,
        user: {},
    })
    useEffect(function (){authorize(setUser)}, [])

    return (
        <div>
            <div>
                {user.authorized ? <NavBar User={user.user}/> : 'Forbidden'}
            </div>  
        </div>
    )
}

export default Dashboard