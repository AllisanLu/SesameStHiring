import { Outlet } from "react-router-dom";

import "./portal.css"
import ManagerNavigation from "../components/manager/CandidateNavigation";

function ManagerPage({ user }) {
    return (
      <div className="CandidatePage">
        <ManagerNavigation />
        <h1>Welcome Hiring Manager {user?.username}!</h1>
        <Outlet />
        <img id="welcomeImg" src="https://easydrawingguides.com/wp-content/uploads/2019/01/Bert-and-Ernie-10.png" alt="characters" />
      </div>
    )
  }
  
  export default ManagerPage
  