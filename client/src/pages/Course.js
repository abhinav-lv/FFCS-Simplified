/* IMPORT HOOKS */
import { useState, useEffect } from 'react'

/* IMPORT PACKAGES */
import axios from 'axios'

/* IMPORT COMPONENTS */ 
import NavBar from '../components/NavBar'
import TablesTab from '../components/tabs/TablesTab'
import CoursesTab from '../components/tabs/CoursesTab'
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

/* IMPORT CONTEXT */
import { CourseContextProvider } from '../context/course'

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

/* COURSE PAGE */
const Course = () => {

    // States
    const [tabIndex, setTabIndex] = useState(0)
    const [user, setUser] = useState({
        authorized: false,
        user: {},
    })
    
    // Authorize user at first render
    useEffect(function (){authorize(setUser)}, [])

    return user.authorized ? (
        <CourseContextProvider>
            <NavBar User={user.user}/>
            <Box width='90%' margin='auto' mt='25px'>
                <Tabs
                    isFitted
                    index={tabIndex}
                    onChange={(index) => setTabIndex(index)}
                >
                    <TabList width='90%' margin='auto'>
                        <Tab>Courses</Tab>
                        <Tab>Tables</Tab>
                        <Tab>Share</Tab>
                    </TabList> 

                    <TabPanels>
                        <TabPanel>
                            <CoursesTab user={user.user} tabIndex={tabIndex} setTabIndex={setTabIndex}/>
                        </TabPanel>
                        <TabPanel>
                            <TablesTab tabIndex={tabIndex} setTabIndex={setTabIndex}/>
                        </TabPanel>
                        <TabPanel>
                            Share the tables you've made
                        </TabPanel>
                    </TabPanels>

                </Tabs>
            </Box>
        </CourseContextProvider>
    ) : <p>Forbidden</p>

}

export default Course