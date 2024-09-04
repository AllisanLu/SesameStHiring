import { useState, useEffect } from "react";
import { updateUser } from "../../database";
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
                        <h4>Select Role</h4>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="type" value="candidate" id="flexRadioDefault1"
                                defaultChecked={user.type === "candidate"} onChange={handleOnChange} />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Candidate
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="type" value="manager" id="flexRadioDefault2"
                                defaultChecked={user.type === "manager"} onChange={handleOnChange} />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Manager
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="type" value="admin" id="flexRadioDefault3"
                                defaultChecked={user.type === "admin"} onChange={handleOnChange} />
                            <label className="form-check-label" htmlFor="flexRadioDefault3">
                                Admin
                            </label>
                        </div>
                        <div className="button-group">
                            <button className="btn btn-success" type="submit">
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
