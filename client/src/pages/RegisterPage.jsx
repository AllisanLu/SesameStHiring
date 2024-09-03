/* eslint-disable react/prop-types */
import { useState } from "react";
import { createUser } from '../database.js'

const RegisterPage = () => {
    const [newUser, setNewUser] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        createUser(newUser);
        setNewUser({ username: "", password: "" });
    }

    const resetState = () => {
        setNewUser({ username: "", password: "" });
    };

    const handleCancel = (e) => {
        e.preventDefault();
        resetState();
        // go back to login page
    };

    const handleOnChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="LoginPage">
            <div className="centered-element ">
                <img src={`https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Sesame_Street_logo.svg/2560px-Sesame_Street_logo.svg.png`} className="logo" alt="sesame street logo" />
                <h1>Hiring</h1>
                <form onSubmit={handleSubmit} onReset={handleCancel}>
                    <h3>Create new user</h3>
                    <div className="mb-3 form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            placeholder="Enter username"
                            value={newUser?.username}
                            className="form-control"
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    {/* <div className="mb-3 form-group">
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
                    </div> */}
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
                        <button className="btn btn-secondary" type="reset">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
