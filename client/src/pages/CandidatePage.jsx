import { Outlet } from "react-router-dom";
import CandidateNavigation from "../components/candidate/CandidateNavigation";

import "./Candidate.css"

function CandidatePage({ user }) {
    return (
      <div className="CandidatePage">
        <CandidateNavigation></CandidateNavigation>
        <h1>Welcome {user?.username}!</h1>
        <Outlet />
        <img id="welcomeImg" src="https://wallpapers.com/images/hd/cute-cartoon-sesame-street-characters-1841n41pmobi9iqy.jpg" alt="characters" />
      </div>
    )
  }
  
  export default CandidatePage
  