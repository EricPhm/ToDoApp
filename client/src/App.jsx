// import { useEffect } from 'react'
// import axios from 'axios'

import { Provider } from 'react-redux';
import store from './redux/store';
import { Routes, Route } from 'react-router-dom'

import NavBar from "./components/NavBar"
import Home from "./routes/Home"
import Account from "./routes/Account"
import LogIn from './routes/LogIn'
import Register from "./routes/Register"

import ReduxHome from './routes/ReduxHome';

function App() {

  return (
    <Provider store={store}>
      <NavBar/>
      <div className="container">
        <Routes>
          <Route path="/redux" element={<ReduxHome/>}/>
          <Route path="/account" element={<Account/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </div>
    </Provider>
  )
}

export default App



  // const fetchApi = async () => { 
  //   try {
  //     const response = await axios.get('http://localhost:8080');
  //     // if (!response.ok) {
  //     //     throw new Error('Network response was not ok');
  //     // }
  //     console.log(response.data.fruits)
  //   } catch (error) {
  //       console.error('There was a problem with the fetch operation:', error);
  //   }
  // }

  // useEffect(() => {
  //   fetchApi()
  // }, [])