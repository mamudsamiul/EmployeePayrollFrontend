import React from "react"
import logo from "../../assets/images/logo1.jpg"
import "./header.css"
const Header=()=>{
    return(
        <header className='header'>
            <div className="logo">
                <img src={logo} alt="" />
                <div>
                    <span className="emp-text">EMPLOYEE</span> <br/>
                    <span className="emp-text emp-payroll">PAYROLL</span>
                </div>
            </div>
        </header>
    )
}
export default Header;