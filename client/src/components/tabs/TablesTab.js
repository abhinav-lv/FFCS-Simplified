/* IMPORT COMPONENTS */ 
import { Box } from '@chakra-ui/react'
import PickedCoursesTable from '../PickedCoursesTable'

/* ------------------------------------------------------------------------------------------------- */

/* TABLES TAB COMPONENT */
const Tables = ({tabIndex, setTabIndex}) => {

    return (
        <Box width='90%' margin='auto'>
            <PickedCoursesTable tabIndex={tabIndex} setTabIndex={setTabIndex}/>
        </Box>
    )
}

export default Tables