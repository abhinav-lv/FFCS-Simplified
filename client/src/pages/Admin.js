/* IMPORT HOOKS */
import { useState, useEffect } from "react"

/* IMPORT PACKAGES */
import axios from "axios"

/* IMPORT COMPONENTS */
import Forbidden from '../components/Forbidden'
import InputForm from '../components/InputForm'
import NavBar from "../components/NavBar"
import { Box } from '@chakra-ui/react'

/* ------------------------------------------------------------------------------------------------- */

// Authorize user with server
const authorize = async (setUser) => {
    try{
        const res = await axios.get('/admin/authorize')
        setUser({
            authorized: true,
            user: res.data,
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

/* ADMIN PAGE */
const Admin = () => {

    const [user, setUser] = useState({
        authorized: false,
        user: {},
    })
    useEffect(function (){authorize(setUser)}, [])

    return user.authorized ?  (
        <>
            <NavBar User={user.user}/>
            <Box width='90%' margin='auto' mt='25px'>
                <InputForm/>
            </Box>
        </>
    ) : <Forbidden message={{status: 'Forbidden', description: 'You don\'t have access to this page'}}/>

}

export default Admin