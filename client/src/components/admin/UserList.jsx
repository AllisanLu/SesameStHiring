import { useEffect, useState } from "react"
import User from "./User";

function UserList({ users, loadUsers }) {
  const [userList, setUserList] = useState()
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    if (users) setUserList(users)
  }, [users])

  const handleView = (user) => {
    if (user.id === selectedUser?.id) {
      setSelectedUser();
    } else {
      setSelectedUser(user);
    }
  }

  return (
    <>
      <h3>System Users</h3>
      <div>
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
        <button className="btn btn-success">Add new Admin</button>
      </div>
      <User selectedUser={selectedUser} setSelectedUser={setSelectedUser} loadUsers={loadUsers} />
    </>
  )
}

export default UserList
