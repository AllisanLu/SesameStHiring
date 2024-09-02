import { Link } from "react-router-dom"

import "../Navigation.css"

function ManagerNavigation() {
  return (
    <div className="Navigation">
      <nav>
        <img src={`https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Sesame_Street_logo.svg/2560px-Sesame_Street_logo.svg.png`} className="logo" />
        <div>
          <Link to="">Home</Link>
          <Link to="joblistings">View Jobs</Link>
          <Link to="candidates">View Candidates</Link>
          <Link to="/">Logout</Link>
        </div>
      </nav>
    </div>
  )
}

export default ManagerNavigation
