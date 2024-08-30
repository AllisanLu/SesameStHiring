import { Outlet } from "react-router-dom";
import { useState } from "react";
import CandidateNavigation from "../components/candidate/CandidateNavigation";

import "./portal.css"

function CandidatePage({ user }) {
  const [newCandidate, setNewCandidate] = useState({});

  const handleSubmit = async (e) => {
      e.preventDefault();
     // set new candidate and reload the page
  }

  const handleOnChange = (e) => {
    setNewCandidate({
        ...newCandidate,
        [e.target.name]: e.target.value
    })
}

  return (
    <div className="CandidatePage">
      <CandidateNavigation></CandidateNavigation>
      <h1>Welcome {user?.username}!</h1>
      <h2>Password: {user?.password}</h2>
      {user.type ? (<Outlet />) : (
        <form onSubmit={handleSubmit} >
        <h3>Create your candidate profile</h3>
        <div className="mb-3 form-group">
            <label htmlFor="name">Name</label>
            <input
                id="name"
                name="name"
                type="name"
                value={newCandidate?.name}
                placeholder="name"
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
                value={newCandidate?.email}
                placeholder="Enter email"
                className="form-control"
                onChange={handleOnChange}
                required
            />
        </div>
        <div className="button-group">
            <button className="btn btn-secondary" type="submit">
                Create
            </button>
        </div>
    </form>
      )}
      <img id="welcomeImg" src="https://wallpapers.com/images/hd/cute-cartoon-sesame-street-characters-1841n41pmobi9iqy.jpg" alt="characters" />
    </div>
  )
}

export default CandidatePage
