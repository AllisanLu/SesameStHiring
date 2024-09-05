import { useState, useEffect } from "react";
import { updateUser } from "../../database";
import { toast } from "react-toastify";
import "../Modal.css"

function User({ selectedUser, setSelectedUser, loadUsers }) {

    const [user, setUser] = useState(selectedUser);

    useEffect(() => {
        if (selectedUser) setUser(selectedUser);
        else setUser();
    }, [selectedUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(user.id, user).then(res => {
            setUser();
            setSelectedUser();
            loadUsers();
            toast.success("Successfully updated !");
        })
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
            { user ?
            <div className="modal-bg left-text">
                <div className="modal-content">
                    <form onSubmit={handleSubmit} onReset={handleCancel}>
                        <h3>Edit User</h3>
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
                                Update
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
