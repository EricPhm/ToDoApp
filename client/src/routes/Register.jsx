import { useState, useEffect } from 'react' 
import { useNavigate } from 'react-router-dom'
import "../css/form.css"

import axios from "axios"

const api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/log_in/register/'
})


function Register() {
    const navigate = useNavigate()
    const [UserName, setUserName] = useState("")
    const [Password, setPassword] = useState("")
    const [secondPass, setSecondPass] = useState("")
    const [match, setMatch] = useState(false)
    const [Error, setError] = useState("")
    // const [showPass, setShowPass] = useState(false)

    useEffect(() => {
        if(Password != secondPass){
            setMatch(false)
        }
    },[Password, secondPass])

    const handlePassword = (e) => {
        const value = e.target.value
        setPassword(value)
        setMatch(value)
    }

    const handleSecondMatch = (e) => {
        const value = e.target.value
        setSecondPass(value)
        setMatch(value === Password)
    }

    const addNewUser = async (e) => {
        e.preventDefault(); // Prevent form submission
        if(UserName.length === 0 || Password.length === 0 || secondPass.length === 0) {
            return setError("Please fill in all required")
        } 
        try {
            let res = await api.post('/', {
                UserName: UserName,
                UserPassword: Password
            })
            if(res.status === 200){
                navigate('/login')
            }
        } catch (e) {
            console.error(e)
            setError(e.response.data)
        }
    }

    return (
        <div>
            <form onSubmit={addNewUser}>
                <div>
                    <label htmlFor="Username">Username: </label>
                    <input 
                        type="text"
                        id='Username'
                        name="Username"
                        placeholder='Enter your username'
                        value = {UserName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <br />
                <div> 
                    <label htmlFor="Password">Password: </label>
                    <input 
                        type="password"
                        id='Password'
                        name="Password"
                        placeholder='Enter your password'
                        value = {Password}
                        onChange={handlePassword}
                    />
                    <button></button>
                </div>
                <br />
                <div> 
                    <label htmlFor="Password2">Match password: </label>
                    <input 
                        type="password"
                        id='Password2'
                        name="Password2"
                        placeholder='Enter your password again'
                        value = {secondPass}
                        onChange={(e) => setSecondPass(e.target.value)}
                        onMouseOut={handleSecondMatch}
                    />
                    <button></button>
                </div>
                <br />
                {!match && <div className='error-message'>Password does not match</div>}
                {Error && <div className='error-message'>{Error}</div>}
                <button disabled={!match}>Register</button>
            </form>
        </div>
    ) 
}

export default Register

// This for wrapper to make btn inside input
// https://www.google.com/search?q=how+to+show+button+in+input+field&rlz=1C1ONGR_enUS997US997&oq=how+to+show+button+in+inp&gs_lcrp=EgZjaHJvbWUqBwgCECEYoAEyBggAEEUYOTIHCAEQIRigATIHCAIQIRigATIHCAMQIRigATIHCAQQIRigAdIBCTEwMjkxajBqOagCALACAQ&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:d1818379,vid:kr5nR6qHScA,st:0