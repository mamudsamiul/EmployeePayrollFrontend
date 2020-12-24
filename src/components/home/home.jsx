import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './home.scss';
import EmployeeService from '../../services/employee-service';
import Header from "../header/header"

class Home extends React.Component{
    employeeService = new EmployeeService();
    constructor(props){
        super(props);
        this.state={
            employeeArray: ([])
        }
        this.getAllEmployees();
    }
    getAllEmployees(){
        (new EmployeeService()).getAllEmployees().then(data => {
            console.log(data);
            this.setState({employeeArray : data.data});
        }).catch(err => console.log(err));
    }

    remove(id){
        (new EmployeeService()).deleteEmployee(id).then(data => {
            alert("Delete successfully");
            console.log("Delete successfully");
            this.props.location.reload();
        }).catch(err => console.log(err));
    }

    render(){
        return (
            <div>
                <Header/>
                <div className="main-content">
                    <div className="header-content">
                        <div className="emp-detail-text">
                            Employee Details<div className="emp-count">{this.state.employeeArray.length}</div>
                        </div>
                        <Link to="/employee-form" className="add-button">
                            <img alt="" src='/assets/icons/add-24px.svg' />Add User</Link>
                    </div>
                    <div className="table-main">
                        <table id="display" className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Gender</th>
                                    <th>Department</th>
                                    <th>Salary</th>
                                    <th>Start Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                               
                            </tbody>

                        </table>
                    </div>   
                </div>
            </div>
        );
    }
}

export default withRouter(Home);