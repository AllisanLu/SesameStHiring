/* eslint-disable react/prop-types */
import { useState } from "react";
import { createUser } from '../database.js'
import { useNavigate } from "react-router-dom";

const RegisterPage = ({setCurrentUser}) => {
    const [newUser, setNewUser] = useState({});
    let navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await createUser(newUser);
        setCurrentUser(response);

        if (response.type === "candidate") {
            navigate("/candidate");
        } else if (response.type === "manager") {
            navigate("/manager");
        }

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
                    <div className="form-check">
                        <h4>Select Role</h4>
                        <input className="form-check-input" type="radio" name="type" value="candidate" id="flexRadioDefault1" onChange={handleOnChange}/>
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Candidate
                            </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="type" value="manager" onChange={handleOnChange} id="flexRadioDefault2" />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Manager
                            </label>
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
