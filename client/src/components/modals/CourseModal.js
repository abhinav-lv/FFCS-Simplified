/* IMPORT HOOKS */
import { useContext } from "react"

/* IMPORT COMPONENTS */
import { Modal, ModalOverlay, ModalContent,
         ModalHeader, ModalCloseButton, 
         ModalBody, ModalFooter,Box, Badge,
         TableContainer, Thead, Tbody,
         Table, Tr, Th, Td, Button
        } from '@chakra-ui/react'

/* IMPORT CONTEXT */
import { CourseContext } from "../../context/course"

/* ------------------------------------------------------------------------------------------------- */

/* COURSE MODAL COMPONENT */
const CourseModal = ({slot, pickedSlot, setPickedSlot, course, setTabIndex}) => {

    // Course state
    const state = useContext(CourseContext)

    // Handle modal close
    const onClose = () => setPickedSlot({})

    // Handle Add Course To Table
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

    // Slot time of day (morning or evening)
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

export default CourseModal