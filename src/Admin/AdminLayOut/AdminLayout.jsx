import React from 'react'
import SideBar from "./SideBar/SideBar"
import AdminNav from "./AdminNav/AdminNav"
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
      <SideBar/>
      <Outlet/>
    </div>
  )
}

export default AdminLayout