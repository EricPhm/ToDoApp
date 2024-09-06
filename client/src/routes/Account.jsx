import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoginStatus } from '../redux/loginStatus/loginStatus'


import HomeCSS from '../css/home.module.css'
import axios from 'axios'
import { useEffect } from 'react';

const api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080'
  })
  
// use redux or pass children ?
function Account() {
    const dispatch = useDispatch()
    const navigate = useNavigate() 
    const loginStatus = useSelector((state) => state.loginStatus.isLoggedIn)

    useEffect(() => { 
        const checkLoginStatus = async() => {
            try {
                const res = await api.get('/user/checkCookie', { withCredentials: true })
                if(res.status === 200) {
                    dispatch(setLoginStatus(true))
                    return 
                }
            } catch (e) {
                console.error('Error checking missions :', e);
                dispatch(setLoginStatus(false))
            }
        }
        checkLoginStatus();

    }, [dispatch])

   
    const handelLogin = () => {
        navigate('/login')
    }

    const handleRegister = () => {
        navigate('/register')
    }

    const handleLogOut = async() => {
        try {
            const res = await api.post('/log_out', {withCredentials: true})
            if(res.status === 200){
                // setMissions([]) // back to original state
                dispatch(setLoginStatus(false))
                navigate('/')
            }
        } catch (err) {
        console.error('Error logging out:', err);
        }
    }

    return (
        <div className={HomeCSS.home_container}>
            {
                loginStatus === false ?
                <div>
                    <button className={HomeCSS.button}onClick={handelLogin}>Log In</button>
                    <button onClick={handleRegister}>Register</button>
                </div>
                :  <button onClick={handleLogOut}>Log Out</button>
            }
        </div>
  )
}

export default Account
