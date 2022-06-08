

import UserLogin from './components/User/UserLogin';
import UserSignUp from './components/User/UserSignUp';
import NavBar from './components/navBar';
import NavBar2 from './components/navBar/navbar2';
import LoginSuccess from './components/User/LoginSuccess';
import Home from './components/home';
import ShowUserData from './components/showdatabase';
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ErrorBoundary from './components/User/errorBoundary';


import './App.css';
import { Route, Routes } from 'react-router-dom';


function App() {

  const userName = useSelector((state) => state.login.userName);
  const location = useLocation();

  function HeaderView() {
    
    
    return (

      (location.pathname == '/showdb' || location.pathname == '/loginSuccess' || userName != '') ? <NavBar2 /> : <NavBar />)
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
          <Route path={'/loginSuccess'} element={userName ? <LoginSuccess /> : <UserLogin />} />

        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
