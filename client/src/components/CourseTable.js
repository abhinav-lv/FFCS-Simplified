/* IMPORT COMPONENTS */
import CourseInfo from './info/CourseInfo'
import SlotTable from './SlotTable'

/* ------------------------------------------------------------------------------------------------- */

/* COURSE TABLE COMPONENT */
const CourseTable = ({course, tabIndex, setTabIndex}) => {
    return (
        <div>
            {/* Course Info */}
            <CourseInfo 
                codes={{theory: course?.theoryCourseCode, lab: course?.labCourseCode}} 
                credits={{theory: course?.theoryCourseCredits, lab: course?.labCourseCredits}} 
                titles={{theory: course?.theoryCourseTitle, lab:course?.labCourseTitle}} 
                type={course?.courseType} 
                category={course?.category}
            />

            {/* Display Slots for selected course */}
            <SlotTable tabIndex={tabIndex} setTabIndex={setTabIndex} course={course}/>
        </div>
    )
}

export default CourseTable