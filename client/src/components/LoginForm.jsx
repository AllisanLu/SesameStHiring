/* eslint-disable react/prop-types */
import { useState } from 'react'
import { login } from '../database'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function LoginForm({ setToken, loadUser, loadPage }) {
  const [userInfo, setUserInfo] = useState({})
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await login(userInfo, setToken);

    if (user.id) {
      await loadUser(user.id);
      await loadPage();
      
      if (user.type === "ROLE_ADMIN") {
        navigate("/admin")
      } else if (user.type === "ROLE_MANAGER") {
        navigate("/manager")
      } else {
        navigate("/candidate")
      }
      toast.success("Successfully logged in !");
    }
  }

  const handleOnChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name] : e.target.value
    })
  }

  return (
    <>
      <form>
        <div className='form-group'>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" value={userInfo.name} placeholder='username' className="form-control"
            onChange={handleOnChange}></input>
        </div>
        <div className='form-group'>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={userInfo.name} placeholder='password' className="form-control"
            onChange={handleOnChange}></input>
        </div>
        <button type="submit" className="btn btn-secondary" onClick={handleLogin}>Login</button>
      </form>
    </>
  )
}

export default LoginForm
