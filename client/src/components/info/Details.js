/* IMPORT COMPONENTS */
import {Box, Heading, Wrap, WrapItem, Text} from '@chakra-ui/react'

/* ------------------------------------------------------------------------------------------------- */

/* DETAILS COMPONENT */
const Details = ({user, courses}) => {

    return (
        <Box mt='25px'>
            <Heading fontSize='25px'>Details</Heading>
            <Wrap marginTop='15px'>
                <WrapItem>
                    <Box width='130px' bg='blue.50' padding='15px 25px 20px 15px' borderRadius='5px'>
                        <Text fontWeight='bold' color='blue.600' marginBottom='10px'>Batch</Text>
                        <Text color='gray.700' fontWeight='semibold' fontSize='15px'>{'20'+(user.class)}</Text>
                    </Box>
                </WrapItem>
                <WrapItem>
                    <Box width='130px' bg='red.50' padding='15px 25px 20px 15px' borderRadius='5px'>
                        <Text fontWeight='bold' color='red.600' marginBottom='10px'>School</Text>
                        <Text color='gray.700' fontWeight='semibold' fontSize='15px'>{user.school.toUpperCase()}</Text>
                    </Box>
                </WrapItem>
                <WrapItem>
                    <Box width='130px' bg='orange.50' padding='15px 25px 20px 15px' borderRadius='5px'>
                        <Text fontWeight='bold' color='orange.600' marginBottom='10px'>Semester</Text>
                        <Text color='gray.700' fontWeight='semibold' fontSize='15px'>
                            {(courses[0]?.semester.toUpperCase() || 'FALL')+' '+(courses[0]?.year || new Date().getFullYear())}
                        </Text>
                    </Box>
                </WrapItem>
                <WrapItem>
                    <Box width='130px' bg='green.50' padding='15px 25px 20px 15px' borderRadius='5px'>
                        <Text fontWeight='bold' color='green.600' marginBottom='10px'>Courses</Text>
                        <Text color='gray.700' fontWeight='semibold' fontSize='15px'>{courses.length}</Text>
                    </Box>
                </WrapItem>
            </Wrap>
        </Box>
    )
}

export default Details