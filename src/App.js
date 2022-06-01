

import UserLogin from './components/User/UserLogin';
import UserSignUp from './components/User/UserSignUp';
import NavBar from './components/navBar';
import NavBar2 from './components/navBar/navbar2';
import LoginSuccess from './components/User/LoginSuccess';
import Home from './components/home';
import ShowUserData from './components/showdatabase';
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';


import './App.css';
import { Route, Routes } from 'react-router-dom';


function App() {

  const userName = useSelector((state) => state.login.userName);

  function HeaderView() {
    const location = useLocation();
    console.log('headervie:', location.pathname);
    return (

      (location.pathname == '/showdb' || location.pathname == '/loginSuccess' || userName != '') ? <NavBar2 /> : <NavBar />)
  }

  return (
    <div className="App">

      {HeaderView()}


      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/userLogin' element={<UserLogin />} />
        <Route path='/userSignIn' element={<UserSignUp />} />
        <Route path='/showdb' element={<ShowUserData />} />
        <Route path={'/loginSuccess'} element={userName ? <LoginSuccess /> : <UserLogin />} />
      </Routes>
    </div>
  );
}

export default App;
