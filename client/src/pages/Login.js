/* IMPORT HOOKS */
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

/* IMPORT PACKAGES */
import axios from 'axios'
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google"

/* IMPORT COMPONENTS */
import { Box, Heading, Text} from '@chakra-ui/react'

/* IMPORT STYLES */
import '../styles/Login.css'

/* ------------------------------------------------------------------------------------------------- */

/* LOGIN CARD COMPONENT */
const LoginCard = ({googleLogin}) => {
    return (
        <Box maxW='32rem' margin='200px 0 0 0'>
            <Heading fontSize='60px' mb={8}>Need help with your FFCS?</Heading>
            <Text fontSize='20px' fontWeight='bold' color='gray.600'>We've got you covered! 😄</Text>
            <Text fontSize='20px' fontWeight='normal' marginBottom='50px' color='gray.500'>Just sign in with your VIT email ID to get started.</Text>
        </Box>
    )
}

/* ------------------------------------------------------------------------------------------------- */

/* LOGIN PAGE */
const LoginPage = () => {

    // Navigate Hook
    const navigate = useNavigate()

    // Success and Error handlers for Google Sign In
    const onSuccess = async (res) =>{
        const response = await axios.post('/auth/authenticate', {
            token: res.credential,
        })
        if(response.status === 200) navigate('/dashboard')
        else console.log('Auth error')
    }
    const onError = () => console.log('Login failed')

    // Google Login Function
    const googleLogin = useGoogleLogin({
        onSuccess: onSuccess,
        onError: onError,
        flow: 'auth-code'
    })

    const authorize = async () => {
        try{
            await axios.get('/auth/authorize')
            navigate('/dashboard')

        }
        catch(error){
            // Not logged in
        }
    }

    useEffect(function() {
        authorize() // eslint-disable-next-line
    },[])

    return (
        <div>
            <div style={{marginLeft: '70px'}}>
                <LoginCard googleLogin={googleLogin}/>
                <GoogleLogin onSuccess={onSuccess} onError={onError} useOneTap/>
            </div>
        </div>
    )
}

export default LoginPage