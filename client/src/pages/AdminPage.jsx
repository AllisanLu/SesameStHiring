import UserList from "../components/admin/UserList"
import { useState, useEffect } from "react";

import "./portal.css"
import Navigation from "../components/Navigation"
import { getUsers } from "../database";

function AdminPage({ user }) {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
            .then(users => setUsers(users))
    }, [])

    return (
      <div className="CandidatePage">
        <Navigation />
        <h1>Welcome Administrator {user?.username}!</h1>
        <UserList users={users} setUsers={setUsers}/>
      </div>
    )
  }
  
  export default AdminPage
  