import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Button } from '@chakra-ui/react'
import NavBar from '../components/NavBar'
import { useState } from 'react'

const Rough = () => {

    const [tabIndex, setTabIndex] = useState(0)

    return (
        <>
            <NavBar/>
            <div style={{width: '80%', margin: 'auto', marginTop: '20px'}}>
                <Tabs 
                    index={tabIndex} 
                    position='relative' 
                    variant='unstyled'
                    onChange={(index) => setTabIndex(index)}
                >
                    <TabList>
                        <Tab>One</Tab>
                        <Tab>Two</Tab>
                        <Tab>Three</Tab>
                    </TabList>

                    <TabIndicator height='2px' bg='blue.600' transition='800ms'/>

                    <TabPanels>
                        <TabPanel>
                            <Button onClick={() => setTabIndex(1)}>
                                Change to Tab 2
                            </Button>
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>three!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </>
    )
}

export default Rough