import {
    Flex, Box, Text, Badge,
    IconButton, DrawerFooter,
    useDisclosure,
    Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton, Avatar
  } from '@chakra-ui/react'

import { HamburgerIcon} from '@chakra-ui/icons'

function PlacementExample({User}) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
    <>
        <IconButton icon={<HamburgerIcon/>} ml='10px' variant='outline' onClick={onOpen}/>
        <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                
                <DrawerHeader>
                    Menu
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
                    </Box>
                </DrawerBody>

                <DrawerFooter alignItems='left'>
                    <div style={{width: '100%'}}>
                        <Text fontWeight='bold' color='gray.600'>FFCS Simplified</Text>
                        <Text fontSize='15px' color='gray.600'>Made with 💙 by Abhinav LV</Text>
                    </div>
                </DrawerFooter>
            </DrawerContent>
      </Drawer>
    </>
    )
}

const NavBar = ({User}) => {
    return (
        <>
            <Flex margin='15px 0 0 15px'>
                <PlacementExample User={User}/>   
            </Flex>
        </>
    )
}

export default NavBar