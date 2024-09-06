
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setLoginStatus } from '../redux/loginStatus/loginStatus'

import axios from "axios"
import '../css/form.css'
// const LogInURL = "http://localhost:8080/log_in"

const api = axios.create({
    withCredentials: true, // Ensures cookies are sent with requests, this keep the cookie
    baseURL: 'http://localhost:8080/log_in/'
})

function LogIn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [UserName, setUserName] = useState("")
    const [Password, setPassword] = useState("")
    const [Error, setError] = useState("")


    const handleLogIn = async (e) => {
        e.preventDefault(); // Prevent form submission
        try {
            let res = await api.post('/',{
                UserName: UserName,
                UserPassword: Password
            })
            if(res.status === 200){
                console.log(res.status)
                // console.log(res.data) // debugging
                dispatch(setLoginStatus(true))
                navigate('/')
            }
        } catch (err) {
            console.log('Error: ' + err.message)
            setError("Incorrect username or password. Please try again.")
        }
        
        // If wrong log in, appear on top
        // wrong password
    }
    
    const handleRegister = () => {
        navigate('/register')
    }

    return (
        <div>
        <form onSubmit={handleLogIn}>
            <div>
                <label htmlFor="UserName">Username: </label>
                <input 
                    type="text" 
                    id="UserName"
                    name="UserName"
                    placeholder="Enter your username"
                    value={UserName}
                    onChange={(e) => setUserName(e.target.value)} 
                />
            </div>
            <br/>
            <div> 
                <label htmlFor="Password">Password: </label>
                <input 
                    type="text" 
                    id="Password"
                    name="Password"
                    placeholder="Enter your password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <br />
            {Error && <div className="error-message">{Error}</div>}
            <button>Log In</button>
            {/* <button onClick={handleLogIn}>Log In</button> */}
        </form>
        <button onClick={handleRegister}>Register</button>
        </div>
    )
}

export default LogIn
