import "./portal.css"
import Navigation from "../components/Navigation"
import { Outlet } from "react-router-dom";

function AdminPage({ user }) {

    return (
      <div className="Page">
        <Navigation />
        <h1>Welcome Administrator {user?.username}!</h1>
        <Outlet />
        <img id="welcomeImg" src="https://i.pinimg.com/originals/65/20/22/652022790d54e1d6ce5e5dc89b1ec073.png" alt="cookie monster" />
      </div>
    )
  }
  
  export default AdminPage
  