import { useState, useEffect } from "react";

function User({ selectedUser, setSelectedUser }) {

    const [user, setUser] = useState(selectedUser);

    useEffect(() => {
        if (selectedUser) setUser(selectedUser);
        else setUser();
    }, [selectedUser]);

    const handleSubmit = (e) => {
        console.log(`Updating user ${user.name}`)
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
                <form onSubmit={handleSubmit} onReset={handleCancel}>
                    <h3>Create new user</h3>
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
                        <button className="btn btn-success" type="submit">
                            Update
                        </button>
                        <button className="btn btn-secondary" type="reset">
                            Cancel
                        </button>
                    </div>
                </form>
                : null}
        </>
    )
}

export default User
