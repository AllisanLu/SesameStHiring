import { Link } from "react-router-dom"

import "./Navigation.css"

function Navigation() {
  return (
    <div className="Navigation">
      <nav>
        <img src={`https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Sesame_Street_logo.svg/2560px-Sesame_Street_logo.svg.png`} className="logo" />
        <div>
          <Link to="">Home</Link>
          <div className="dropdown">
            <button className="dropbtn">Manage
            </button>
            <div className="dropdown-content">
              <Link to="users">Users</Link>
              <Link to="candidates">Candidates</Link>
              <Link to="managers">Managers</Link>
              <Link to="joblistings">Jobs</Link>
              <Link to="applications">Applications</Link>
            </div>
          </div>
          <Link to="/">Logout</Link>
        </div>
      </nav>
    </div>
  )
}

export default Navigation
