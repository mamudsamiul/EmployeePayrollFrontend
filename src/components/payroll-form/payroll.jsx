import React, { useState, useEffect } from "react"
import logo from "H:/React App/employee-payroll/src/assets/images/logo.jpg"
import "./payroll.css"
import Select from "react-select";
import { toast, ToastContainer } from 'react-toastify';
import { useParams, Link, withRouter } from 'react-router-dom';
const payroll=(props)=>{
    return(
       <div className="payroll-main">
           <ToastContainer/>
           <div className="Header">
               <img src={logo} alt=""/>

           </div>
           
       </div>
    )
}
export default payroll;