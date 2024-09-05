import { useState, useEffect } from "react";
import { createUser, updateUser } from "../../database";
import { toast } from "react-toastify";
import "../Modal.css"

function User({ selectedUser, setSelectedUser, loadUsers, token }) {

    const [user, setUser] = useState(selectedUser);

    useEffect(() => {
        if (selectedUser) setUser(selectedUser);
        else setUser();
    }, [selectedUser]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        let fixedUser = user;

        if (user.type) {
            if (user.type == "admin") {
                 fixedUser = {
                  ...user,
                  type: "ROLE_ADMIN"
                }
              } else if (user.type == "manager") {
                fixedUser = {
                  ...user,
                  type: "ROLE_MANAGER"
                }
              } else {
                fixedUser = {
                  ...user,
                  type: "ROLE_CANDIDATE"
                }
              }

            await updateUser(fixedUser.id, fixedUser, token).then(async(res) => {
                setUser();
                setSelectedUser();
                await loadUsers();
                toast.success("Successfully updated !");
            })
        } else {
            const adminUser = {
                ...user,
                type: "ROLE_ADMIN"
            }
            await createUser(adminUser, token).then(async(res) => {
                setUser();
                setSelectedUser();
                await loadUsers();
                toast.success("Successfully created !");
            })
        }
    }

    const resetState = () => {
        setSelectedUser();
        setUser();
    };

    const handleCancel = (e) => {
        e.preventDefault();
        resetState();
    };

    const handleOnChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            {user ?
                <div className="modal-bg left-text">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit} onReset={handleCancel}>
                            {user.type ? <h3>Edit User</h3> : <h3>Create New Admin</h3>}
                            <div className="mb-3 form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    id="username"
                                    name="username"
                                    placeholder="Enter username"
                                    value={user?.username}
                                    className="form-control"
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                            <div className="mb-3 form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={user?.password}
                                    placeholder="Password"
                                    className="form-control"
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                            <div className="button-group">
                                <button className="btn btn-warning" type="submit">
                                    {user.type ? "Update" : "Create"}
                                </button>
                                <button className="btn btn-secondary" type="reset">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div >
                </div >
                : null
            }
        </>
    )
}

export default User
