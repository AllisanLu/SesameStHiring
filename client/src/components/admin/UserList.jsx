import { useState } from "react"
import User from "./User";

function UserList({ users, setUsers }) {
  const [selectedUser, setSelectedUser] = useState();

  const handleView = (user) => {
    if (user.id === selectedUser?.id) {
      setSelectedUser();
    } else {
      setSelectedUser(user);
    }
  }

  return (
    <>
      {/* Could sort candidates by the job they applied for */}
      <h3>System Users</h3>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Password</th>
              <th>User Role</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => {
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
      <User selectedUser={selectedUser} setSelectedUser={setSelectedUser} setUsers={setUsers} />
    </>
  )
}

export default UserList
