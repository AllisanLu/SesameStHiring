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
              <th>Username</th>
              <th>Password</th>
              <th>User Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => {
              return (
                <tr key={user.id} onClick={() => handleView(user)}>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.type}</td>
                  <td>{user.type === "admin" ? (
                    <div>
                      <button className="btn btn-secondary">Set as Manager</button>
                      <button className="btn btn-secondary">Set as Candidate</button>
                      <button className="btn btn-secondary">Delete User</button>
                    </div>
                  ) : null}
                    {user.type === "manager" ? (
                      <div>
                        <button className="btn btn-secondary">Set as Admin</button>
                        <button className="btn btn-secondary">Set as Candidate</button>
                        <button className="btn btn-secondary">Delete User</button>
                      </div>
                    ) : null}
                    {user.type === "candidate" ? (
                      <div>
                        <button className="btn btn-secondary">Set as Manager</button>
                        <button className="btn btn-secondary">Set as Admin</button>
                        <button className="btn btn-secondary">Delete User</button>
                      </div>
                    ) : null}
                  </td>
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
