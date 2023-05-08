import { useState } from "react";
import axios from "axios";
import '../styles/AdminCourseInput.css';

const LabComponentForm = ({status, inputs, handleChange}) => {
    if(status === 0) return <p></p>
    else if(status === 1) return (
        <div>
            <h1>Lab Component</h1>
            <p>Lab Course Title: {(inputs.theoryCourseTitle || '')+' Lab'}</p>
            <p>
            {
            inputs.courseType === 'emb' 
            ? `Embedded Lab Course Code: ${inputs.theoryCourseCode}` 
            : `Lab Course Code: ${(inputs.theoryCourseCode?.slice(0,-1) || '')+'P'}`
            }
            </p>
            <p>
                No. of credits: 
                <select style={{marginLeft: "95px"}} name="labCourseCredits" value={inputs.labCourseCredits || 1} onChange={handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </p>
            <p> Enter lab slots and faculties: </p>
            <textarea name="labCourseSlots" value={inputs.labCourseSlots} onChange={handleChange} required/>
        </div>

    )
}

function InputForm(){

    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = (name === "theoryCourseCode") ? e.target.value.toUpperCase() : e.target.value;

        if(name === 'courseType'){
            if(e.target.value === 'thl' || e.target.value === 'emb'){
                setInputs(values => ({...values, [name]: value, hasLabComponent: 1}))
            }
            else if(e.target.value === 'tho' || e.target.value === 'sts'){
                setInputs(values => ({...values, [name]: value, hasLabComponent: 0}))
            }
        }
    
        // I still don't understand how this shit works
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const studentBatch = inputs.studentBatch || 19
        const studentSchool = inputs.studentSchool || 'scope'
        const courseType = inputs.courseType || 'tho'
        const semester = inputs.semester || 'fall'
        const year = new Date().getFullYear()
        const category = inputs.category || 'fc'
        const hasLabComponent = Number(inputs.hasLabComponent) || 0
        const theoryCourseTitle = inputs.theoryCourseTitle
        const theoryCourseCode = inputs.theoryCourseCode
        const theoryCourseCredits = inputs.theoryCourseCredits || 1
        const theoryCourseSlots = inputs.theoryCourseSlots.replace(/\n+$/, "").split("\n").map((slot) => {
            slot = slot.split("\t")
            return {
                slot: slot[0].split('+'),
                venue: slot[1],
                faculty: slot[2],
                courseType: slot[3]
            }
        })

        const courseID = `${studentBatch}-${studentSchool}-${theoryCourseCode.slice(0,-1)}-${semester}-${year}`;
        
        if(hasLabComponent === 0)
            axios.post('/admin/CourseData', {
                courseID,
                studentBatch,
                studentSchool,
                semester,
                year,
                courseType,
                category,
                theoryCourseCode,
                theoryCourseTitle,
                theoryCourseCredits,
                theoryCourseSlots,
                hasLabComponent,
            });
        else if(hasLabComponent === 1){
            const labCourseCode = inputs.theoryCourseCode?.slice(0,-1)+'P';
            const labCourseTitle = inputs.theoryCourseTitle+' Lab';
            const labCourseCredits = inputs.labCourseCredits || 1;
            const labCourseSlots = inputs.labCourseSlots.replace(/\n+$/, "").split("\n").map((slot) => {
                slot = slot.split("\t");
                return {
                    slot: slot[0].split('+'),
                    venue: slot[1],
                    faculty: slot[2],
                    courseType: slot[3]
                };
            });

            axios.post('/admin/CourseData',{
                courseID,
                studentBatch,
                studentSchool,
                courseType,
                category,
                semester,
                year,
                hasLabComponent,
                theoryCourseCode,
                theoryCourseTitle,
                theoryCourseCredits,
                theoryCourseSlots,
                labCourseCode,
                labCourseTitle,
                labCourseCredits,
                labCourseSlots
            });
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form-1">
                <p>
                    Batch: 
                    <select style={{marginLeft: "151px"}} name="studentBatch" value={inputs.studentBatch} onChange={handleChange}>
                        <option value={19}>19</option>
                        <option value={20}>20</option>
                        <option value={21}>21</option>
                        <option value={22}>22</option>
                        <option value={23}>23</option>
                    </select>
                </p>
                <p>
                    School: 
                    <select style={{marginLeft: "144px"}} name="studentSchool" value={inputs.studentSchool} onChange={handleChange}>
                        <option value="scope">SCOPE</option>
                        <option value="site">SITE</option>
                        <option value="sense">SENSE</option>
                        <option value="select">SELECT</option>
                        <option value="vaial">VAIAL</option>
                        <option value="smec">SMEC</option>
                        <option value="sce">SCE</option>
                        <option value="sas">SAS</option>
                        <option value="sbst">SBST</option>
                        <option value="scheme">SCHEME</option>
                        <option value="vitbs">VITBS</option>
                    </select>
                </p>
                <p>
                    Semester:
                    <select style={{marginLeft: '126px'}} name='semester' value={inputs.semester} onChange={handleChange}>
                        <option value='fall'>Fall</option>
                        <option value='winter'>Winter</option>
                    </select>
                </p>
                <p>
                    Category:
                    <select style={{marginLeft: '126px'}} name='category' value={inputs.category} onChange={handleChange}>
                        <option value='fc'>Foundation Core</option>
                        <option value='dles'>Discipline Linked</option>
                        <option value='dc'>Discipline Core</option>
                        <option value='de'>Discipline Elective</option>                        
                        <option value='oe'>Open Elective</option>                        
                        <option value='ngc'>Non Graded Core</option>                        
                    </select>
                </p>
                <p>
                    Enter name of subject:
                    <input style={{marginLeft: "30px"}} name="theoryCourseTitle" type="text" value={inputs.theoryCourseTitle || ""} onChange={handleChange} required/>
                </p>
                <p>
                    Enter course code: 
                    <input style={{marginLeft: "60px"}} name="theoryCourseCode" type="text" value={inputs.theoryCourseCode || ""} onChange={handleChange} required/>
                </p>
                <p>
                    Course Type:
                    <select style={{marginLeft: '102px'}} name='courseType' value={inputs.courseType} onChange={handleChange}>
                        <option value='tho'>Theory</option>
                        <option value='thl'>Theory+Lab</option>
                        <option value='emb'>Embedded</option>
                        <option value='sts'>STS</option>
                    </select>
                </p>
                <p>
                    No. of credits: 
                    <select style={{marginLeft: "95px"}} name="theoryCourseCredits" value={inputs.theoryCourseCredits} onChange={handleChange}>
                        <option value="1">1</option>
                        <option value="1.5">1.5</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </p>
                <p> Enter theory slots and faculties: </p>
                <textarea name="theoryCourseSlots" value={inputs.theoryCourseSlots} onChange={handleChange} required/>

                {/* <p>Has Lab Component? </p>
                {/* <select name="hasLabComponent" value={inputs.hasLabComponent || 0} onChange={handleChange}>
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                </select> */}
                <LabComponentForm status={inputs.hasLabComponent} inputs={inputs} handleChange={handleChange}/>

                <p><input type="submit"/></p>
            </form>
        </div>
    );
}

export default InputForm;