import React, { useContext } from 'react'
import { SidebarContext } from '../context/SidebarContext';
import { logout } from '../utils/auth';

const MainTools = () => {

  const [sidebarOpen , setSidebarOper] = useContext(SidebarContext);

  return (
    <div className="sidebar-tools-container">
        {
            !sidebarOpen ? 
            <div className='sidebar-control'>
                    <button className='btn' onClick={()=> setSidebarOper(true)}><i className="fa-solid fa-bars"></i></button>
            </div>
            :
            ""
        }

        {/* <div className='search-container'>
            <input type="text" className='search-input' placeholder='Search here ...'/>
        </div> */}

        <div className="dashboard-tools-container">
            <button className='btn' onClick={()=> logout()}><i className='fa-solid fa-power-off'></i></button>
        </div>
    </div>
  )
}

export default MainTools