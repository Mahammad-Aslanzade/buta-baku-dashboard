import React, { useEffect } from 'react'
import Dashboard from './Dashboard';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import './assets/scss/style.scss'
import Login from './pages/auth/Login';
import { SideBarProvider } from './context/SidebarContext';
import { HashRouter as BrowserRouter } from 'react-router-dom';
import { ApiUrlProvider } from './context/ApiUrlContext';
import { deleteCookie, getCookie } from './utils/cookie';

const App = () => {
  const login = getCookie('token');

  const date = new Date();

    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    //     Last entered time
    const lastEnter = getCookie("loginTime");

    useEffect(() => {
        //  Expired day
        if ( (date.getTime() - lastEnter) > day) {
            deleteCookie("token");
        }

    },);



  return (
    <>
    {
      (!login || (date.getTime() - lastEnter) > day)
      // false
      ?
      <Login />
      :
      <BrowserRouter>
        <ApiUrlProvider>
          <SideBarProvider>
            <Dashboard />      
          </SideBarProvider>
        </ApiUrlProvider>
      </BrowserRouter>
    }
    </>
  )
}

export default App