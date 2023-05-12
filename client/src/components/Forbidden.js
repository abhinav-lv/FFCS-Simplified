import { Link as RouterLink } from 'react-router-dom'
import { Box, Heading, Text, Link } from '@chakra-ui/react'

/* FORBIDDEN COMPONENT (lol) */
const Forbidden = ({message}) => {

    return (
        <Box w='100%' bg='red.50' mt='-25px' padding='60px 10px 35px' borderBottom={'5px solid #C53030'}>
            <Box w='90%' m='auto'>
                <Heading color='red.700'>{message.status}</Heading>
                <Text mt='10px'>{message.description}</Text>
                <Text mt='25px'>
                    <Link fontWeight='semibold' color='red.700' as={RouterLink} to='../'>Go to Login</Link>
                </Text>
            </Box>
        </Box>
    )
}

export default Forbidden