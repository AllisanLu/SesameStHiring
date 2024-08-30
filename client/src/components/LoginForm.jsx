import { useState } from 'react'

function LoginForm() {
  const userInfo = useState({})

  return (
    <>
      <form>
        <div className='form-group'>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" value={userInfo.name} placeholder='username' className="form-control"></input>
        </div>
        <div className='form-group'>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={userInfo.name} placeholder='password' className="form-control"></input>
        </div>
        {/* <button type="submit" className="btn btn-secondary">Login</button> */}
        <a href="candidate" className="btn btn-secondary">Login</a>
      </form>
    </>
  )
}

export default LoginForm
