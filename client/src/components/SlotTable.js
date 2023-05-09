/* IMPORT HOOKS */
import { useState } from 'react'

/* IMPORT COMPONENTS */
import CourseModal from './modals/CourseModal'
import { Table,Thead, Tbody, Tr, Th, Td, TableContainer, Button, Heading } from '@chakra-ui/react'

/* ------------------------------------------------------------------------------------------------- */

/* SLOT TABLE COMPONENT */
const SlotTable = ({course, setTabIndex}) => {

    // To display modal when user picks a slot
    const [pickedSlot, setPickedSlot] = useState({})

    // Execute on clicking the 'pick' button to pick a slot
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

    // Get slot elements (rows) for the table
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
            {Object.keys(pickedSlot).length === 0 ? <p></p> 
            : <CourseModal 
                slot={pickedSlot} 
                pickedSlot={pickedSlot} 
                setPickedSlot={setPickedSlot}
                course={course}
                setTabIndex={setTabIndex}
              />}

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