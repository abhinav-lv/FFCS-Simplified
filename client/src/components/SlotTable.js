/* Import hooks */
import { useState, useContext } from 'react'

/* Import context */
import { CourseContext } from '../context/course'

/* Import components */
import {
    Table,Thead, Tbody, Tr, Th, Td, TableContainer,
    Button, Heading, Badge, Box,
    Modal, ModalOverlay, ModalContent, ModalHeader,ModalFooter, ModalBody, ModalCloseButton,
  } from '@chakra-ui/react'

const SlotTable = ({course, setTabIndex}) => {

    // To display modal when user picks a slot
    const [pickedSlot, setPickedSlot] = useState({})

    // Context state
    const state = useContext(CourseContext)

    // Modal Component
    const CourseModal = ({slot}) => {

        const onClose = () => setPickedSlot({})
        const onAddToTable = () => {
            onClose()
            state.setPickedCourse({
                category: course.category,
                type: course.courseType,
                hasLabComponent: course.hasLabComponent,
                theoryCourseCode: course.theoryCourseCode,
                theoryCourseTitle: course.theoryCourseTitle,
                theoryCourseCredits: course.theoryCourseCredits,
                labCourseCode: course.labCourseCode,
                labCourseTitle: course.labCourseTitle,
                labCourseCredits: course.labCourseCredits,
                faculty: pickedSlot.theory.faculty,
                theoryCourseSlot: pickedSlot.theory.slot,
                labCourseSlot: pickedSlot.lab?.slot,
                theoryVenue: pickedSlot.theory.venue,
                labVenue: pickedSlot.lab?.venue
            })
            setTabIndex(1)
        }
        const time = slot.theory.slot[0].slice(-1) === '1' ? 'Morning Theory' : 'Evening Theory'

        return (
            <Modal size='2xl' isOpen={Object.keys(pickedSlot).length ? true : false} onClose={onClose} isCentered motionPreset='slideInBottom'>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Confirm selection</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box>
                        <Badge mb='10px' colorScheme='orange'>{time}</Badge>
                    </Box>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Slot</Th>
                                    <Th>Faculty</Th>
                                    <Th>Venue</Th>
                                    <Th>Component</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>{slot.theory.slot.join('+')}</Td>
                                    <Td>{slot.theory.faculty}</Td>
                                    <Td>{slot.theory.venue}</Td>
                                    <Td>
                                        <Badge colorScheme='purple'>Theory</Badge>
                                    </Td>
                                </Tr>
                                {slot.lab ? 
                                    <Tr>
                                        <Td>{slot.lab.slot.join('+')}</Td>
                                        <Td>{slot.lab.faculty}</Td>
                                        <Td>{slot.lab.venue}</Td>
                                        <Td>
                                            <Badge colorScheme='pink'>Lab</Badge>
                                        </Td>
                                    </Tr> : <></>}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </ModalBody>

                <ModalFooter>
                    <Button variant='ghost' colorScheme='red' mr={3} onClick={onClose}>
                    Close
                    </Button>
                    <Button variant='ghost' colorScheme='blue' onClick={onAddToTable}>
                        Add to Table
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }

    // On clicking the 'pick' button to pick a slot
    const coursePick = (e) => {
        const picked = e.target.id.split('-')
        const slot = picked[0].split('+')
        const faculty = picked[1]

        let theorySlot, labSlot

        // Check if theory component was clicked or lab component
        const theory = slot[0][0] === 'L' ? false : true

        // Check if morning or evening
        if(theory){
            const morning = slot[0].slice(-1) === '1' ? true : false
            if(morning){
               course.labCourseSlots.forEach((slot) => {
                if(slot.faculty === faculty){
                    if(Number(slot.slot[0].split('L')[1]) > 30){
                        labSlot = slot
                        return
                    }
                }
               })
            }
            else{
                course.labCourseSlots.forEach((slot) => {
                    if(slot.faculty === faculty){
                        if(Number(slot.slot[0].split('L')[1]) < 31){
                            labSlot = slot
                            return
                        }
                    }
                   })
            }
            course.theoryCourseSlots.forEach((slot) => {
                if(slot.faculty === picked[1] && slot.slot.join('+') === picked[0]){
                    theorySlot=slot
                    return
                }
            })
        }
        else{
            const morning = Number(slot[0].split('L')[1]) < 31 ? true : false
            if(morning){
                course.theoryCourseSlots.forEach((slot) => {
                    if(slot.faculty === faculty){
                        if(slot.slot[0].slice(-1) === '2'){
                            theorySlot = slot
                            return
                        }
                    }
                   })
            }
            else{
                course.theoryCourseSlots.forEach((slot) => {
                    if(slot.faculty === faculty){
                        if(slot.slot[0].slice(-1) === '1'){
                            theorySlot = slot
                            return
                        }
                    }
                   })
            }
            course.labCourseSlots.forEach((slot) => {
                if(slot.faculty === picked[1] && slot.slot.join('+') === picked[0]){
                    labSlot=slot
                    return
                }
            })
        }
        setPickedSlot({
            theory: theorySlot,
            lab: labSlot
        })
    }

    // Get slot elements for the table
    const getSlotElements = (slots) => {
        return slots?.map((slot) => {
            return (
                <Tr key={slot._id} id={slot._id}>
                    <Td>{slot.slot.join('+')}</Td>
                    <Td>{slot.faculty}</Td>
                    <Td>{slot.venue}</Td>
                    <Td>
                        <Button id={slot.slot.join('+')+'-'+slot.faculty} variant='solid' size='xs' colorScheme='blue' onClick={coursePick}>Pick</Button>
                    </Td>
                </Tr>
            )
        })
    }

    return (
        <>

            {Object.keys(pickedSlot).length === 0 ? <p></p> : <CourseModal slot={pickedSlot}/>}

            {/* Theory Slots Table */}
            <Heading size='lg' color='gray.700' marginTop='35px'>Slots</Heading>
            <TableContainer margin='auto' marginTop='15px'>
                <Table fontSize='13px' variant='striped'>
                    <Thead>
                    <Tr>
                        <Th>Slot</Th>
                        <Th>Faculty</Th>
                        <Th>Venue</Th>
                        <Th>Pick</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {getSlotElements(course?.theoryCourseSlots)}
                    </Tbody>
                </Table>
            </TableContainer>

            {/* Lab Slots Table */}
            {course?.hasLabComponent ? 
            <>
            <Heading size='lg' color='gray.700' marginTop='35px'>Lab Slots</Heading>
            <TableContainer margin='auto' marginTop='15px'>
                <Table fontSize='13px' variant='striped'>
                    <Thead>
                    <Tr>
                        <Th>Slot</Th>
                        <Th>Faculty</Th>
                        <Th>Venue</Th>
                        <Th>Pick</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {getSlotElements(course?.labCourseSlots)}
                    </Tbody>
                </Table>
            </TableContainer> 
            </> : <p></p>}

        </>
    )
}

export default SlotTable