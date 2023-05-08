import {createContext, useState} from 'react'

const CourseContext = createContext({
    pickedCourse : {},
    setPickedCourse: () => {}
})

const CourseContextProvider = ({children}) => {

    const setPickedCourse = (slot) => {
        setState({...state, pickedCourse: slot})
    }

    const initState = {
        pickedCourse: {},
        setPickedCourse: setPickedCourse
    }

    const [state, setState] = useState(initState)

    return (
        <CourseContext.Provider value={state}>
            {children}
        </CourseContext.Provider>
    )

}

export {CourseContext, CourseContextProvider} 