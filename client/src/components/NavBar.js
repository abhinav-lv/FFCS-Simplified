/* IMPORT HOOKS */
import { useNavigate, Link as RouterLink } from 'react-router-dom'

/* IMPORT ICONS */
import { FaTable, FaLayerGroup, FaUser } from 'react-icons/fa'
import { HamburgerIcon} from '@chakra-ui/icons'

/* IMPORT COMPONENTS */
import {
    Flex, Box, Text, Badge,
    IconButton, DrawerFooter,
    useDisclosure, Button, Heading,
    List, ListItem, ListIcon, Link,
    Drawer, DrawerOverlay, DrawerContent, DrawerHeader, 
    DrawerBody, DrawerCloseButton, Avatar
  } from '@chakra-ui/react'

/* ------------------------------------------------------------------------------------------------- */

/* DRAWER COMPONENT */
function NavDrawer({User}) {

    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
    <>
        <IconButton icon={<HamburgerIcon/>} variant='outline' onClick={onOpen}/>
        <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                
                <DrawerHeader>
                    <Heading fontSize='xl' mt='5px'>User</Heading>
                    <DrawerCloseButton marginTop='8px' />
                </DrawerHeader>

                <DrawerBody>
                    <Box>
                        <Flex alignItems='center' justifyContent='space-between'>
                            <Text fontWeight='bold' color='blue.600'>{User?.regNo}</Text>
                            <Avatar size='sm' bg='blue.500'/>
                        </Flex>
                        
                        <Text fontWeight='bold' color='gray.700' marginBottom='15px'>{User?.name}</Text>
                        {User?.admin ? <Badge marginRight='5px' colorScheme='purple'>ADMIN</Badge> : <p></p>}
                        <Badge marginRight='5px' colorScheme='red'>{User?.school?.toUpperCase()}</Badge>
                        
                        <Box mt='50px'>
                            <Heading fontSize='xl' mb='20px'>Pages</Heading>
                            <List>
                                <ListItem fontSize='15px' mb='20px' fontWeight='semibold'>
                                    <Flex alignItems={'center'}>
                                    <ListIcon as={FaLayerGroup} color='purple.600' mr='15px'/>
                                    <Link color='gray.800' as={RouterLink} to='../dashboard' onClick={onClose}>Dashboard</Link>
                                    </Flex>
                                </ListItem>
                                <ListItem fontSize='15px' mb='20px' fontWeight='semibold'>
                                    <Flex alignItems={'center'}>
                                    <ListIcon as={FaTable} color='purple.600' mr='15px'/>
                                    <Link color='gray.800' as={RouterLink} to='../courses' onClick={onClose}>Courses</Link>
                                    </Flex>
                                </ListItem>
                                {User?.admin ?  
                                <ListItem fontSize='15px' fontWeight='semibold'>
                                    <Flex alignItems={'center'}>
                                        <ListIcon as={FaUser} color='purple.600' mr='15px'/>
                                        <Link color='gray.800' as={RouterLink} to='../admin' onClick={onClose}>Admin</Link>
                                    </Flex>
                                </ListItem>
                                : <p></p>
                                }
                            </List>
                        </Box>
                    </Box>
                </DrawerBody>

                <DrawerFooter alignItems={'center'}>
                    <Box w='100%'>
                        <Button variant='solid' w='100%' colorScheme='red' onClick={() => navigate('/logout')}>Logout</Button>
                    </Box>
                </DrawerFooter>
            </DrawerContent>
      </Drawer>
    </>
    )
}

/* ------------------------------------------------------------------------------------------------- */

/* NAVBAR COMPONENT */
const NavBar = ({User}) => {
    return (
        <Box mt='15px' ml='15px'>
            <NavDrawer User={User}/>   
        </Box>
    )
}

export default NavBar