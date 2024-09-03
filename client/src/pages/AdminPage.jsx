import UserList from "../components/admin/UserList"
import { useState, useEffect } from "react";

import "./portal.css"
import Navigation from "../components/Navigation"
import { getUsers } from "../database";
import { Outlet } from "react-router-dom";

function AdminPage({ user }) {

    return (
      <div className="CandidatePage">
        <Navigation />
        <h1>Welcome Administrator {user?.username}!</h1>
        <Outlet />
      </div>
    )
  }
  
  export default AdminPage
  