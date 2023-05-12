/* IMPORT HOOKS */
import { useContext, useState, useEffect } from 'react'

/* IMPORT COMPONENTS */
import {Table,Thead, Tbody, Tr, Th, Td, TableContainer,
        Modal, ModalOverlay, ModalContent, Text, Badge,
        ModalHeader,ModalFooter, ModalBody, Button,
        Box} from '@chakra-ui/react'

/* IMPORT CONTEXT */
import { CourseContext } from '../context/course'

/* IMPORT COMPONENTS */
import {theoryToLabMap, labToTheoryMap} from '../constants/SlotMaps'

/* ------------------------------------------------------------------------------------------------- */

/* PICKED COURSES TABLE COMPONENT (for showing the selected courses) */
const PickedCoursesTable = ({setTabIndex}) => {
    
    // Picked course state
    const state = useContext(CourseContext)
    const [courses, setCourses] = useState([])
    const [problems, setProblems] = useState({
        sameCourse: false,
        sameCourseContent: {},
        clashingSlots: false,
        clashingSlotsContent: {}
    })
    console.log(courses)

    // Utility function to remove a given course from an array of courses
    const removeCourse = (arr, value) => {
        var i = 0;
        while (i < arr.length) {
          if (JSON.stringify(arr[i]) === value) {
            arr.splice(i, 1);
          } else {
            ++i;
          }
        }
        return arr
    }

    // This modal is displayed when the same course already exists
    const SameCourseModal = () => {

        // Handle modal close
        const onClose = () => {
            setProblems({
                ...problems,
                sameCourse: false,
                sameCourseContent: {}
            })
        }
        // Handle same course keep
        const onKeep = () => {
            let tempCourses = courses
            const courseToDelete = JSON.stringify(problems.sameCourseContent.pickedCourse)
            tempCourses = removeCourse(tempCourses, courseToDelete)
            setCourses(tempCourses)
            onClose()
        }
        // Handle select currently picked course
        const onChange = () => {
            let tempCourses = courses
            const courseToDelete = JSON.stringify(problems.sameCourseContent.matchingCourse)
            tempCourses = removeCourse(tempCourses, courseToDelete)
            setCourses(tempCourses)
            checkClashingSlots()
            onClose()
        }

        return (
            <Modal closeOnOverlayClick={false} size='2xl' isOpen={problems.sameCourse} onClose={onClose} isCentered motionPreset='slideInBottom'>
                <ModalOverlay/>
                <ModalContent>
                <ModalHeader>Course is already selected</ModalHeader>
                
                <ModalBody>
                    <Text>{problems.sameCourseContent.message}</Text>
                    <TableContainer>
                        <Table size='sm' variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Status</Th>
                                    <Th>Slot</Th>
                                    <Th>Faculty</Th>
                                    <Th>Venue</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                <Td>
                                    <Badge colorScheme='green'>Already selected</Badge>
                                </Td>
                                <Td>{problems.sameCourseContent.matchingCourse?.theoryCourseSlot.join('+')}</Td>
                                <Td>{problems.sameCourseContent.matchingCourse?.faculty}</Td>
                                <Td>{problems.sameCourseContent.matchingCourse?.theoryVenue}</Td>
                            </Tr>
                            {problems.sameCourseContent.matchingCourse?.hasLabComponent ? 
                                <Tr>
                                    <Td>
                                        <Badge colorScheme='green'>Already selected</Badge>
                                    </Td>
                                    <Td>{problems.sameCourseContent.matchingCourse?.labCourseSlot.join('+')}</Td>
                                    <Td>{problems.sameCourseContent.matchingCourse?.faculty}</Td>
                                    <Td>{problems.sameCourseContent.matchingCourse?.labVenue}</Td>
                                </Tr> : <></>}
                                <Tr>
                                    <Td>
                                        <Badge colorScheme='red'>Currently picked</Badge>
                                    </Td>
                                    <Td>{problems.sameCourseContent.pickedCourse?.theoryCourseSlot.join('+')}</Td>
                                    <Td>{problems.sameCourseContent.pickedCourse?.faculty}</Td>
                                    <Td>{problems.sameCourseContent.pickedCourse?.theoryVenue}</Td>
                                </Tr>
                                {problems.sameCourseContent.pickedCourse?.hasLabComponent ? 
                                    <Tr>
                                        <Td>
                                            <Badge colorScheme='red'>Currently picked</Badge>
                                        </Td>
                                        <Td>{problems.sameCourseContent.pickedCourse?.labCourseSlot.join('+')}</Td>
                                        <Td>{problems.sameCourseContent.pickedCourse?.faculty}</Td>
                                        <Td>{problems.sameCourseContent.pickedCourse?.labVenue}</Td>
                                    </Tr> : <></>}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </ModalBody>
    
                <ModalFooter>
                    <Button variant='ghost' colorScheme='green' mr={3} onClick={onKeep}>
                        Keep Selected Slot
                    </Button>
                    <Button variant='ghost' colorScheme='red' onClick={onChange}>
                        Take Current Slot
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }

    // This modal is displayed when the picked course has slots that are clashing with the slots of already selected courses
    const ClashingSlotsModal = () => {
        const onClose = () => {
            let tempCourses = courses
            const courseToDelete = JSON.stringify(state.pickedCourse)
            tempCourses = removeCourse(tempCourses, courseToDelete)
            setCourses(tempCourses)
            setTabIndex(0)
            setProblems({
                ...problems,
                clashingSlots: false,
                clashingSlotsContent: {}
            })
        }

        return (
            <Modal closeOnOverlayClick={false} size='2xl' isOpen={problems.clashingSlots} onClose={onClose} isCentered motionPreset='slideInBottom'>
                <ModalOverlay/>
                <ModalContent>
                <ModalHeader>Course with clashing slots</ModalHeader>
                
                <ModalBody>
                    <Text>{problems.sameCourseContent.message}</Text>
                    <TableContainer>
                        <Table size='sm' variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Slot</Th>
                                    <Th>Faculty</Th>
                                    <Th>Venue</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                <Td>{problems.clashingSlotsContent.clashingCourse?.theoryCourseSlot?.join('+')}</Td>
                                <Td>{problems.clashingSlotsContent.clashingCourse?.faculty}</Td>
                                <Td>{problems.clashingSlotsContent.clashingCourse?.theoryVenue}</Td>
                            </Tr>
                            {problems.clashingSlotsContent.clashingCourse?.hasLabComponent ? 
                                <Tr>
                                    <Td>{problems.clashingSlotsContent.clashingCourse?.labCourseSlot?.join('+')}</Td>
                                    <Td>{problems.clashingSlotsContent.clashingCourse?.faculty}</Td>
                                    <Td>{problems.clashingSlotsContent.clashingCourse?.labVenue}</Td>
                                </Tr> : <></>}
                                <Tr>
                                    <Td>{state.pickedCourse?.theoryCourseSlot?.join('+')}</Td>
                                    <Td>{state.pickedCourse?.faculty}</Td>
                                    <Td>{state.pickedCourse?.theoryVenue}</Td>
                                </Tr>
                                {state.pickedCourse?.hasLabComponent ? 
                                    <Tr>
                                        <Td>{state.pickedCourse?.labCourseSlot?.join('+')}</Td>
                                        <Td>{state.pickedCourse?.faculty}</Td>
                                        <Td>{state.pickedCourse?.labVenue}</Td>
                                    </Tr> : <></>}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </ModalBody>
    
                <ModalFooter>
                    <Button variant='ghost' colorScheme='red' onClick={onClose}>
                        Take Another Slot
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        )

    }

    // check if the newly picked course already exists in previously selected courses
    const checkSameCourse = () => {
        courses.forEach((course) => {
            if(course.theoryCourseCode === state.pickedCourse.theoryCourseCode){
                let message=``
                // if same faculty
                if(course.faculty === state.pickedCourse.faculty){
                    if(course.theoryCourseSlot.join('+') === state.pickedCourse.theoryCourseSlot.join('+')){
                        message=`The course ${course.theoryCourseCode} already exists with same faculty and slot`
                    }
                    else{
                        console.log('Course already exists with same faculty but different slot')
                        message=`The course ${course.theoryCourseCode} already exists with same faculty but different slot`
                    }
                }
                else{
                    if(course.theoryCourseSlot.join('+') === state.pickedCourse.theoryCourseSlot.join('+')){
                        message=`The course ${course.theoryCourseCode} already exists with different faculty but same slot`
                    }
                    else{
                        message=`The course ${course.theoryCourseCode} already exists with different faculty and different slot`
                    }
                }
                setProblems({...problems,
                    sameCourse: true,
                    sameCourseContent: {
                        pickedCourse: state.pickedCourse,
                        matchingCourse: course,
                        message: message
                    }})
            }
        })
    }

    // Check for clashing slots
    const checkClashingSlots = () => {

        const pickedCourse = state.pickedCourse

        const pickedSlot = {
            theory: pickedCourse.theoryCourseSlot,
            lab: pickedCourse.labCourseSlot
        }

        let clashing=false

        try{
            // Check if picked course is clashing with each selected course
            courses.forEach((course) => {
                // Get slots of course
                const slot = {
                    theory: course.theoryCourseSlot,
                    lab: course.labCourseSlot,
                }
                // Check if theory slots of pickedCourse are clashing
                pickedSlot.theory.forEach((theorySlot) => {
                    if(slot.theory.includes(theorySlot)) clashing=true
                    else theoryToLabMap[theorySlot].forEach((labSlot) => {
                        if(slot.lab?.includes(labSlot)) clashing=true
                    })
                })
                // Check if lab slots of pickedCourse are clashing
                pickedSlot.lab?.forEach((labSlot) => {
                    if(slot.lab?.includes(labSlot)) clashing=true
                    if(slot.theory.includes(labToTheoryMap[labSlot][0])) clashing=true
                })

                if(clashing){
                    const error = {clashingCourse: course}
                    throw error
                }
            })
        } catch(e){
            setProblems({...problems,
                clashingSlots: true,
                clashingSlotsContent: {
                    clashingCourse: e.clashingCourse
                },
            })
        }
    }

    // To add the picked course to list of selected courses
    const addNewCourse = () => {
        if(Object.keys(state.pickedCourse).length && !problems.sameCourse){
            setCourses([...courses, state.pickedCourse])
        }
    }

    useEffect(function() {
        const localCourses = JSON.parse(localStorage.getItem('courses'))
        setCourses(localCourses)
    },[])

    // Add course only when picked course changes
    useEffect(function(){
        checkSameCourse() 
        checkClashingSlots()    
        addNewCourse()          // eslint-disable-next-line
    },[state.pickedCourse])

    // Add courses
    useEffect(function() {
        localStorage.setItem('courses', JSON.stringify(courses))
    },[courses])

    const deleteCourse = (e) => {
        const deleteCourseCode = e.target.id
        console.log(deleteCourseCode)
        let pickedCourse = ''

        for(let i=0; i<courses?.length; i++){
            if(courses[i].theoryCourseCode.slice(0,-1) === deleteCourseCode){
                pickedCourse=JSON.stringify(courses[i])
                break
            }
        }

        let tempCourses = courses.slice()
        tempCourses = removeCourse(tempCourses, pickedCourse)
        console.log(tempCourses)
        setCourses(tempCourses)
    }

    // Get course elements for table (rows)
    const getCourseElements = () => {

        const takenCourses = []
        courses.forEach((course) => {
            takenCourses.push({
                code: course.theoryCourseCode,
                title: course.theoryCourseTitle,
                slot: course.theoryCourseSlot,
                faculty: course.faculty,
                venue: course.theoryVenue,
                credits: course.theoryCourseCredits
            })
            if(course.hasLabComponent){
                takenCourses.push({
                    code: course.labCourseCode,
                    title: course.labCourseTitle,
                    slot: course.labCourseSlot,
                    faculty: course.faculty,
                    venue: course.labVenue,
                    credits: course.labCourseCredits
                })     
            }
        })

        return takenCourses.map((course) => {
            return (
                <Tr key={
                    new Date().toString()+
                    course.code+
                    course.faculty+
                    course.slot
                }>
                    <Td>{course.code}</Td>
                    <Td>{course.title}</Td>
                    <Td>{course.slot.join('+')}</Td>
                    <Td>{course.faculty}</Td>
                    <Td>{course.venue}</Td>
                    <Td>{course.credits}</Td>
                    <Td>
                    <Button id={course.code.slice(0,-1)} variant='solid' size='xs' colorScheme='red' onClick={deleteCourse}>Delete</Button>
                    </Td>
                </Tr>
            )
        })
    }

    return (
        <Box>
            View selected courses and slots
            <SameCourseModal/>
            <ClashingSlotsModal/>
            <TableContainer margin='auto' marginTop='15px'>
                <Table fontSize='13px'>
                    <Thead>
                    <Tr>
                        <Th>Code</Th>
                        <Th>Title</Th>
                        <Th>Slot</Th>
                        <Th>Faculty</Th>
                        <Th>Venue</Th>
                        <Th>Credits</Th>
                        <Th>Delete</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {getCourseElements()}
                    </Tbody>
                </Table>
            </TableContainer> 
        </Box>
    )
}   

export default PickedCoursesTable