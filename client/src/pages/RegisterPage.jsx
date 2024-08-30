/* eslint-disable react/prop-types */
import { useState } from "react";

const RegisterPage = () => {
    const [newUser, setNewUser] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        // api call
        setNewUser({ username: "", email: "", password: "" });
    }

    const resetState = () => {
        setNewUser({ username: "", email: "", password: "" });
    };

    const handleCancel = (e) => {
        e.preventDefault();
        resetState();
    };

    const handleOnChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

return (
    <div className="RegisterPage">
        <form onSubmit={handleSubmit} onReset={handleCancel}>
            <h3>Create new user</h3>
            <div className="mb-3 form-group">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    placeholder="Enter username"
                    value={newUser?.name}
                    className="form-control"
                    onChange={handleOnChange}
                    required
                />
            </div>
            <div className="mb-3 form-group">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={newUser?.email}
                    placeholder="Enter email"
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
                    value={newUser?.password}
                    placeholder="Password"
                    className="form-control"
                    onChange={handleOnChange}
                    required
                />
            </div>
            <div className="button-group">
                <button className="btn btn-success" type="submit">
                    Create
                </button>
                <button className="btn btn-secondary"type="reset">
                    Cancel
                </button>
            </div>
        </form>
    </div>
);
};

export default RegisterPage;
