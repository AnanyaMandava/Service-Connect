import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import AdminSidebar from '../AdminSidebar/AdminSidebar';

function AdminLayout (props) {
    return <>
        <AdminNavbar role={props.role} changeLoginStatus={props.changeLoginStatus}/>
        <div className='container-fluid layoutContainer'>
            <AdminSidebar/>
            <Outlet/>
        </div>
    </>  
}

export default AdminLayout;