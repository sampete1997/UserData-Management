

import UserLogin from './components/User/UserLogin';
import UserSignUp from './components/User/UserSignUp';
import NavBar from './components/navBar';
import NavBar2 from './components/navBar/navbar2';
import AdminNavBar from './components/navBar/adminNavbar';
import LoginSuccess from './components/User/LoginSuccess';
import Home from './components/home';
import ShowUserData from './components/showdatabase';
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import ErrorBoundary from './components/User/errorBoundary';


import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import AdminNavBar2 from './components/navBar/adminNavbar';


function App() {

  const location = useLocation();
  const dispatch = useDispatch()
  let userDetails

  userDetails = localStorage.getItem('userDetails') != '' ? JSON.parse(localStorage.getItem('userDetails')) : ''

  function HeaderView() {

    if ((location.pathname == '/showdb' || location.pathname == '/loginSuccess' || location.pathname == '/') && userDetails.isAdmin === 'true') {
      return <AdminNavBar />
    }

    else if ((location.pathname == '/loginSuccess' || location.pathname == '/') && (userDetails!= '')) {
      return <NavBar2 />
    }

    else {

      return <NavBar />
    }
  }

  return (
    <div className="App">

      <ErrorBoundary key={location.pathname}>

        {HeaderView()}
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/userLogin' element={<UserLogin />} />
          <Route path='/userSignUp' element={<UserSignUp />} />
          <Route path='/showdb' element={<ShowUserData />} />
          <Route path={'/loginSuccess'} element={<LoginSuccess />} />

        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
