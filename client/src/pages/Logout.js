/* IMPORT PACKAGES */
import axios from 'axios';

/* IMPORT COMPONENTS */
import Forbidden from '../components/Forbidden';

/* ------------------------------------------------------------------------------------------------- */

/* LOGOUT FUNCTION */
const LogoutPage = () => {

    // const navigate = useNavigate()

    // send a get request to the server to destory existing session
    const logout = async () => {
        await axios.get('/auth/logout')
    }
    logout()

    return <Forbidden message={{status: 'Logged out', description: 'Thanks for using FFCS Simplified'}}/>
}

export default LogoutPage;