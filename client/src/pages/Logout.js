import axios from 'axios';

const LogoutPage = () => {

    // send a get request to the server to destory existing session
    const logout = async () => {
        const response = await axios.get('/auth/logout')
        console.log(response)
    }
    logout()

    return <p>Logged Out!</p>
}

export default LogoutPage;