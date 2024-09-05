import "./portal.css"
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

function AdminPage({ user }) {
  
  const [admin, setAdmin] = useState(user)

  useEffect(() => {
    if (user) {
      setAdmin(user)
    }
  }, [user])

  return (
    <>
      <div className="Page">
        <Navigation />
        <h1>Welcome Administrator {admin?.username}!</h1>
        <Outlet />
        <img id="welcomeImg" src="https://i.pinimg.com/originals/65/20/22/652022790d54e1d6ce5e5dc89b1ec073.png" alt="cookie monster" />
      </div>
      <Footer></Footer>
    </>
  )
}

export default AdminPage
