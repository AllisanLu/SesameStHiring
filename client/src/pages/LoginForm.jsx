import { useState } from 'react'

function LoginForm() {
    const userInfo = useState({})

  return (
    <>
      <form>
        <h3>Login</h3>
        <div>
            <label for="username">Username</label>
            <input id="username" name="username" type="username" value={userInfo.name}></input>
        </div>
      </form>
    </>
  )
}

export default LoginForm
