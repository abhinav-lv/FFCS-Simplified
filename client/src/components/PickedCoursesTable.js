/* Import hooks */
import { useContext, useState, useEffect } from 'react'

/* Import context */
import { CourseContext } from '../context/course'

/* Import components */
import {Table,Thead, Tbody, Tr, Th, Td, TableContainer,
        Modal, ModalOverlay, ModalContent, Text, Badge,
        ModalHeader,ModalFooter, ModalBody, Button,
        Box} from '@chakra-ui/react'

const PickedCoursesTable = () => {
    
    const state = useContext(CourseContext)
    const [courses, setCourses] = useState([])
    const [problems, setProblems] = useState({
        sameCourse: false,
        sameCourseContent: {},
        clashingSlots: false,
        clashingSlotsContent: {}
    })
    console.log(courses)

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

        const onClose = () => {
            setProblems({
                ...problems,
                sameCourse: false,
                sameCourseContent: {}
            })
        }
        const onKeep = () => {
            let tempCourses = courses
            const courseToDelete = JSON.stringify(problems.sameCourseContent.pickedCourse)
            tempCourses = removeCourse(tempCourses, courseToDelete)
            setCourses(tempCourses)
            onClose()
        }
        const onChange = () => {
            let tempCourses = courses
            const courseToDelete = JSON.stringify(problems.sameCourseContent.matchingCourse)
            tempCourses = removeCourse(tempCourses, courseToDelete)
            setCourses(tempCourses)
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

    // To check for clashing slots
    const checkClashingSlots = () => {
        const pickedCourse = state.pickedCourse
        console.log('Checking clashing slots...\nPicked course slots: ', pickedCourse.theoryCourseSlot, pickedCourse.labCourseSlot)
        courses.forEach((course) => {
            console.log(`${course.theoryCourseCode}: ${course.theoryCourseSlot}, ${course.labCourseSlot}`)
        })
    }

    // To add a new course
    const addNewCourse = () => {
        if(Object.keys(state.pickedCourse).length && !problems.sameCourse){
            setCourses([...courses, state.pickedCourse])
        }
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

    // Add course only when picked course changes
    useEffect(function(){
        checkSameCourse() 
        checkClashingSlots()    
        addNewCourse()          // eslint-disable-next-line
    },[state.pickedCourse])

    return (
        <Box>
            View selected courses and slots
            <SameCourseModal/>
        </Box>
    )
}   

export default PickedCoursesTable