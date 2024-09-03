import { Outlet } from "react-router-dom";

import "./portal.css"
import ManagerNavigation from "../components/manager/ManagerNavigation";
import ManagerView from "../components/manager/ManagerView.jsx";

function ManagerPage({ user, setUser }) {

    return (
      <div className="Page">
        <ManagerNavigation />
        <h1>Welcome Hiring Manager {user?.username}!</h1>
        {user.fullName ? (<Outlet />) : <ManagerView user={user} setUser={setUser} />}
        <img id="welcomeImg" src="https://easydrawingguides.com/wp-content/uploads/2019/01/Bert-and-Ernie-10.png" alt="characters" />
      </div>
    )
  }
  
  export default ManagerPage
  