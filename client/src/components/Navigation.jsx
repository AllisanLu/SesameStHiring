import "./Navigation.css"

function Navigation() {
  return (
    <div className="Navigation">
      <nav>
        <img src={`https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Sesame_Street_logo.svg/2560px-Sesame_Street_logo.svg.png`} className="logo" />
        <div>
          <a href="home">Home</a>
          <div className="dropdown">
            <button className="dropbtn">Jobs
            </button>
            <div className="dropdown-content">
              <a href="#">View Jobs</a>
              <a href="#">View Applications</a>
            </div>
          </div>
          <a href="/">Logout</a>
        </div>
      </nav>
    </div>
  )
}

export default Navigation
