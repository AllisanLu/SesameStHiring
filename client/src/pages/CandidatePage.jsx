import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import CandidateNavigation from "../components/candidate/CandidateNavigation";
import Footer from "../components/Footer";

import "./portal.css"
import CandidateView from "../components/candidate/CandidateView";

function CandidatePage({ user, setUser }) {

  const [candidate, setCandidate] = useState(user);

  useEffect(() => {
    if (user) {
      setCandidate(user);
    }
  }, [user])

  return (
    <>
      <div className="Page">
        <CandidateNavigation></CandidateNavigation>
        <h1>Welcome Candidate {user?.username}!</h1>
        {user.fullName ? (<Outlet />) : <CandidateView user={user} setUser={setUser} />}
        <img id="welcomeImg" src="https://wallpapers.com/images/hd/cute-cartoon-sesame-street-characters-1841n41pmobi9iqy.jpg" alt="characters" />
      </div>
      <Footer></Footer>
    </>
  )
}

export default CandidatePage
