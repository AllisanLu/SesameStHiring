import { useEffect, useState } from "react"
import User from "./User";

function UserList({ users, loadUsers, token }) {
  const [userList, setUserList] = useState()
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    console.log(users)
    setUsersClean(users);
  }, [users])

  const setUsersClean = (users) => {
    if (users) {
      const cleanedRoles = users.map((user) => {
        if (user.type == "ROLE_ADMIN") {
          return {
            ...user,
            type: "admin"
          }
        } else if (user.type == "ROLE_MANAGER") {
          return {
            ...user,
            type: "manager"
          }
        } else {
          return {
            ...user,
            type: "candidate"
          }
        }
      })
      setUserList(cleanedRoles)
    }
  }

  const handleView = (user) => {
    if (user.id === selectedUser?.id) {
      setSelectedUser();
    } else {
      setSelectedUser(user);
    }
  }

  const handleCreate = () => {
    setSelectedUser({});
  }

  const handleSearch = (e) => {
    if (e.target.value) {
      const filteredList = userList?.filter((user) => {
        return user.username.toLowerCase().includes(e.target.value.toLowerCase()) 
          || user.type.toLowerCase().includes(e.target.value.toLowerCase());
      }) ;
      setUserList(filteredList);
    } else {
      setUsersClean(users);
    }
  }

  return (
    <>
      <h3>System Users</h3>
      <div>
        <div>
          <label htmlFor="search" className="font-23">Search: </label>
          <input className="search-bar font-23" id="search" name="search" placeholder="Search Username or Role" onChange={(e) => handleSearch(e)}/>
          <button className="btn btn-success" onClick={handleCreate}>Add new Admin</button>
        </div>
        <div className="table-wrapper">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Password</th>
                <th>User Role</th>
              </tr>
            </thead>
            <tbody className="table-horizontal">
              {userList?.map((user) => {
                return (
                  <tr key={user.id} onClick={() => handleView(user)}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.password}</td>
                    <td>{user.type}</td>
                  </tr>
                )
              }
              )}
            </tbody>
          </table>
        </div>
      </div>
      <User selectedUser={selectedUser} setSelectedUser={setSelectedUser} loadUsers={loadUsers} token={token} />
    </>
  )
}

export default UserList
