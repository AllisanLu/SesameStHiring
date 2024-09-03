import { Outlet } from "react-router-dom";
import { useState } from "react";
import CandidateNavigation from "../components/candidate/CandidateNavigation";
import { createCandidate } from "../database";

import "./portal.css"
import NewCandidate from "../components/candidate/NewCandidate";

function CandidatePage({ user, setUser }) {

  return (
    <div className="CandidatePage">
      <CandidateNavigation></CandidateNavigation>
      <h1>Welcome {user?.username}!</h1>
      <h2>Password: {user?.password}</h2>
      {user.type ? (<Outlet />) : <NewCandidate user={user} setUser={setUser} />}
      <img id="welcomeImg" src="https://wallpapers.com/images/hd/cute-cartoon-sesame-street-characters-1841n41pmobi9iqy.jpg" alt="characters" />
    </div>
  )
}

export default CandidatePage
