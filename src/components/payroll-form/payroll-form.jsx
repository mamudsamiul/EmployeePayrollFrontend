import React, { useState, useEffect } from 'react';
import profile1 from '../../assets/profile-images/Ellipse -3.png';
import profile2 from '../../assets/profile-images/Ellipse -1.png';
import profile3 from '../../assets/profile-images/Ellipse -8.png';
import profile4 from '../../assets/profile-images/Ellipse -7.png';
import "./payroll-form.scss";
import { toast, ToastContainer } from 'react-toastify';
import Select from "react-select";
import EmployeeService from "../../services/employee-service";

import { useParams, Link, withRouter } from 'react-router-dom';
import Header from '../header/header';

const PayrollForm = (props) =>{
    let employeeService = new EmployeeService();
    let initialValue = {
        name: '',
        profileArray: [
            { url: profile1 },
            { url: profile2 },
            { url: profile3},
            { url: profile4 }
        ],
        allDepartment: [
            'HR', 'Sales', 'Finance', 'Engineer', 'Others'
        ],
        department: [],
        gender: '',
        salary: '400000',
        day: '1',
        month: 'Jan',
        year: '2020',
        startDate: '',
        notes: '',
        id: '',
        profilePic: '',
        isUpdate: false,
        error: {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profilePic: '',
            startDate: ''
        }
    }

    if (props.location.state && props.location.state[0]==="update"){
        // console.log(props.location.state[1]);
        Object.assign(initialValue, props.location.state[1]);
        initialValue.isUpdate = true;
        [initialValue.day, initialValue.month, initialValue.year] = initialValue.startDate.split(" ");
        initialValue.day = parseInt(initialValue.day);

    }

    const [formValue, setForm] = useState(initialValue);

    const changeValue  = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value })
    }

    const onCheckChange = (name) =>{
        let index = formValue.department.indexOf(name);
        let checkArray = [...formValue.department]
        if (index > -1)
            checkArray.splice(index, 1)
        else
            checkArray.push(name);
        setForm({ ...formValue, department: checkArray });
    }
    const getChecked = (name) =>{
        return formValue.department && formValue.department.includes(name);
    }

    const validData = async () =>{
        let isError = false;
        let error = {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profilePic: '',
            startDate: ''
        }
        if (formValue.name.length < 1){
            error.name = 'name is required field'
            isError = true;
        }
        if (formValue.gender.length < 1){
            error.gender = 'gender is required field'
            isError = true;
        }
        if (formValue.salary.length < 1){
            error.salary = 'salary is required field'
            isError = true;
        }
        if (formValue.profilePic.length < 1){
            error.profilePic = 'profile is required field'
            isError = true;
        }
        if (formValue.department.length < 1){
            error.department = 'department is required field'
            isError = true;
        }

        await setForm({ ...formValue, error: error })
        return isError;

    }

    const save = async (event) =>{
        event.preventDefault();

        if (await validData()){
            console.log('error', formValue);
            return;
        }

        let object = {
            name: formValue.name,
            profilePic: formValue.profilePic,
            gender: formValue.gender,
            department: formValue.department,
            salary: formValue.salary,
            startDate: `${formValue.day.length==1?"0"+formValue.day: formValue.day} ${formValue.month} ${formValue.year}`,
            note: formValue.notes,
            id: formValue.id,
        }
        
        if(formValue.isUpdate){
            employeeService.updateEmployee(formValue.id, object).then(
                (response)=>{ 
                    console.log(response.data)
                    toast.success("Added Sucessfully")
                    props.history.push('')
                },
                (error)=>{
                    console.log(error)
                    toast.error("Server down!!")
                }
            )
        }else{
            employeeService.addEmployee(object).then(
                (response)=>{ 
                    console.log(response.data)
                    toast.success("Added Sucessfully")
                },
                (error)=>{
                    console.log(error)
                    toast.error("Server down!!")
                    props.history.push('') 
                }
            )}
    }
    const reset = () => {
        setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate});
        console.log(formValue);
    }

    // Components
    function ProfilePic(props){     
        return (
            <label className="radio-profile">
                <input type="radio" name="profilePic" checked={formValue.profilePic==props.profile} value={props.profile} onChange={changeValue} />
                <img className="profile" alt="" src={props.profile} />
            </label>
        );
    }

    const departments = ["HR", "Sales", "Finance", "Engineer", "Others"];

    function Department(props){
        return (<>
            <input className="checkbox" type="checkbox" id={props.department} onChange={() => onCheckChange(props.department)} 
                    defaultChecked={getChecked(props.department)} name="department" value={props.department} />
            <label className="text" htmlFor={props.department}>{props.department}</label>
        </>);
    }
    const days = Array.from(new Array(31),(val,index)=>index+1);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const years = [2020,2019,2018,2017,2016];
    return (
        <div className="payroll-main">
            <ToastContainer />
            <Header/>
            <div className="form-content">
                <form className="form" action="#" onReset={reset} onSubmit={save}>
                    <div className="form-head">Employee Payroll Form</div>
                    <div className="row-content">
                        <label className="label text" hmtlFor="name">Name</label>
                        <input className="input" type="text" id="name" name="name" placeholder="Your Name.."  value={formValue.name} onChange={changeValue} />
                    </div>
                    <div className="error">{formValue.error.name}</div>
                    <div className="row-content">
                        <label className="label text" htmlFor="profilePic">Profile image</label>
                        <div className="profile-radio-content">
                            {initialValue.profileArray.map((profile, index)=><ProfilePic key={profile.url.toString()} profile={profile.url} index={index}/>)}
                        </div>
                    </div>
                    <div className="error">{formValue.error.profilePic}</div>
                    <div className="row-content">
                        <label className="label text" htmlFor="gender">Gender</label>
                        <div>
                            <input onChange={changeValue} type="radio" id="male" name="gender" checked={formValue.gender=="male"}  value="male" />
                            <label className="text" htmlFor="male">Male</label>
                            <input onChange={changeValue} type="radio" id="female" name="gender" checked={formValue.gender=="female"} value="female" />
                            <label className="text" htmlFor="female">Female</label>
                        </div>
                    </div>
                    <div className="error">{formValue.error.gender}</div>
                    <div className="row-content">
                        <label className="label text" htmlFor="department">Department</label>
                        <div>
                            {departments.map((department) => <Department key={department.toString()} department={department} />)}
                        </div>
                    </div>
                    <div className="error">{formValue.error.department}</div>
                    <div className="row-content">
                        <label className="label text" htmlFor="salary">Salary: </label>
                        <input className="input" type="range" onChange={changeValue} name="salary" id="salary" min="300000" max="500000" step="100" defaultValue={formValue.salary} />
                        <output className="salary-output text" htmlFor="salary">{formValue.salary}</output>
                    </div>
                    <div className="error">{formValue.error.salary}</div>
                    <div className="row-content">
                        <label className="label text" htmlFor="startDate">Start Date</label>
                        <div className="drop-container">
                            <div className="sidebar">
                                <select className="drop"  onChange={changeValue} id="day"  name="day" defaultValue={formValue.day}>
                                    {days.map((item) => <option key={"day"+item.toString()} value={item}>{item}</option> )}
                                </select>
                            </div>
                            <div className="sidebar">
                                <select className="drop" onChange={changeValue} id="month"  name="month" defaultValue={formValue.month}>
                                    {months.map((item) => <option key={"month"+item.toString()} value={item.slice(0,3)}>{item}</option> )}
                                </select>
                            </div>
                            <div className="sidebar">
                                <select className="drop" onChange={changeValue} id="year"  name="year" defaultValue={formValue.year}>
                                    {years.map((item) => <option key={"year"+item.toString()} value={item}>{item}</option> )}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="error">{formValue.error.startDate}</div>
                    <div className="row-content">
                        <label className="label text" htmlFor="notes">Notes</label>
                        <textarea onChange={changeValue} id="notes" value={formValue.notes} className="input" name="notes" 
                             style={{height: '100px'}}></textarea>
                    </div>
                    <div className="buttonParent">
                        <Link to="/" className="resetButton button cancelButton">Cancel</Link>
                        <div className="submit-reset">
                            <button type="submit" className="button submitButton" id="submitButton" >{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                            <button type="reset" onClick={reset} className="resetButton button">Reset</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default withRouter(PayrollForm);