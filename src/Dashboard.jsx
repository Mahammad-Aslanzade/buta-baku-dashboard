import React, { useContext } from 'react'
import Sidebar from './components/Sidebar'
import { SidebarContext } from './context/SidebarContext'
import logo from './assets/image/logo.png'
import MainTools from './components/MainTools'
import PageContainer from './routes/PageContainer'

const Dashboard = () => {

  const [sidebarOpen , setSidebarOper] = useContext(SidebarContext);

  return (
    <div className='dashboard-main-container'>

        <div className={`sidebar-container container ${sidebarOpen ? "sidebar-shown" : ""}`}>
            <Sidebar logo={logo}/>
        </div>

        <div className={`content-back-layer ${!sidebarOpen ? "content-back-wider" : ""}`}>
            <div className="content-container">
                <MainTools />
                <div className="container-fluid my-4">
                    <PageContainer />
                </div>
            </div>
        </div>

    </div>
  )
}

export default Dashboard