import { Box, Heading, Text} from '@chakra-ui/react'
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import '../styles/Login.css'

// Images
// import googleIcon from '../assets/google.png'

// Card component
const LoginCard = ({googleLogin}) => {
    return (
        <Box maxW='32rem' margin='200px 0 0 0'>
            <Heading fontSize='60px' mb={8}>Need help with your FFCS?</Heading>
            <Text fontSize='20px' fontWeight='bold' color='gray.600'>We've got you covered! 😄</Text>
            <Text fontSize='20px' fontWeight='normal' marginBottom='50px' color='gray.500'>Just sign in with your VIT email ID to get started.</Text>
            {/* <Button variant='outline' size='lg' colorScheme='gray' onClick={googleLogin}>
                <Image src={googleIcon} alt='Google Icon' maxW={{base:'100%', sm:'20px'}}/>
                <Text marginLeft='15px'>Sign in</Text>
            </Button> */}
        </Box>
    )
}

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