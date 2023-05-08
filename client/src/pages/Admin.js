import { useState, useEffect } from "react"
import axios from "axios"
import Forbidden from '../components/Forbidden'
import InputForm from '../components/InputForm'

const authorize = async (setUser) => {
    try{
        const user = await axios.get('/admin/authorize')
        setUser({
            authorized: true,
            user: user,
        })
    }
    catch(error){
        setUser({
            authorized: false,
            user: {},
        })
    }
}

const Admin = () => {

    const [user, setUser] = useState({
        authorized: false,
        user: {},
    })
    useEffect(function (){authorize(setUser)}, [])

    return user.authorized ?  <InputForm/> : <Forbidden/>

}

export default Admin