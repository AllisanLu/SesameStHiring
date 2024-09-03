import { Outlet } from "react-router-dom";
import { useState } from "react";
import CandidateNavigation from "../components/candidate/CandidateNavigation";
import { updateCandidate, deleteCandidate } from "../database";

import "./portal.css"
import NewCandidate from "../components/candidate/NewCandidate";

function CandidatePage({ user, setUser }) {

  const [candidate, setCandidate] = useState(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // set new candidate and reload the page
    console.log(candidate);
    //const res = await createCandidate(user.id, newCandidate)
    //setUser(res);
  }

  const handleOnChange = (e) => {
    setCandidate({
      ...candidate,
      [e.target.name]: e.target.value
    })
  }


  return (
    <div className="CandidatePage">
      <CandidateNavigation></CandidateNavigation>
      <h1>Welcome Candidate {user?.username}!</h1>
      {user.type ? (<Outlet />) : <NewCandidate user={user} setUser={setUser} />}
      {user.type ?
        <form onSubmit={handleSubmit}>
          <h3>Update your candidate profile</h3>
          <div className="mb-3 form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="name"
              value={candidate?.name}
              placeholder="Enter Name"
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
              value={candidate?.email}
              placeholder="Enter email"
              className="form-control"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="mb-3 form-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              name="address"
              value={candidate?.address}
              placeholder="Enter address"
              className="form-control"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="mb-3 form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              value={candidate?.phone}
              placeholder="123-456-7890"
              className="form-control"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="mb-3 form-group">
            <label htmlFor="resume">Resume</label>
            <textarea
              id="resume"
              type="text"
              name="resume"
              value={candidate?.resume}
              placeholder="Enter resume details"
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
        </form> : null}
      <img id="welcomeImg" src="https://wallpapers.com/images/hd/cute-cartoon-sesame-street-characters-1841n41pmobi9iqy.jpg" alt="characters" />
    </div>
  )
}

export default CandidatePage
