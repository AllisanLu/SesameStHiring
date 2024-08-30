import LoginForm from "../components/LoginForm"

import "./LoginPage.css"

function LoginPage() {


    return (
        <div className="LoginPage">
            <div className="centered-element ">
                <img src={`https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Sesame_Street_logo.svg/2560px-Sesame_Street_logo.svg.png`} className="logo" alt="sesame street logo" />
                <h1>Hiring</h1>
                <LoginForm></LoginForm>
                <a href="/register">Register new user</a>
            </div>
        </div>
    )
}

export default LoginPage