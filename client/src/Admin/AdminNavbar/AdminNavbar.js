import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminNavbar.css'

function AdminNavbar (props) {

    const navigate = useNavigate()
    return <>
    <div className='adminNav'>
        <div className='navContents'>
            <span className='navLinks' onClick={()=>navigate('/adminhome')}>Home</span>
            <span className='navLinks'> Contact</span>
            <span className='navLinks' onClick={()=>{props.changeLoginStatus(false)}}> Logout</span>
        </div>
    </div>
    </>
}

export default AdminNavbar;