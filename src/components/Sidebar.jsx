import React, { useContext } from 'react'
import { SidebarContext } from '../context/SidebarContext'
import PageIndicator from './PageIndicator';

const Sidebar = ({logo}) => {

  const [sidebarOpen , setSidebarOpen] = useContext(SidebarContext);
  
  return (
    <div className='sidebar-content-container'>
        <div className="sidebar-head">
            {/* <img width={100} src={logo} alt="" /> */}
            <h3 className='text-white'>İdarə Paneli</h3>
            <button className='btn-close' onClick={()=> setSidebarOpen(!sidebarOpen)}><i className="fa-regular fa-circle-left"></i></button>
        </div>

        <div className="pages-container">

          <PageIndicator title="Təlimat" path="/"  iconClassName='fa-solid fa-list-check'/>
          <PageIndicator title="Ayarlar" path="/mainSetting" /> 
          {/* <PageIndicator title="Kampaniyalar" path="/campaign" iconClassName='fa-regular fa-images'/> */}
          <PageIndicator title="Yeməklər" path="/product" iconClassName='fa-solid fa-utensils'/>
          <PageIndicator title="Kateqoriyalar" path="/category" iconClassName='fa-solid fa-layer-group'/>
          <PageIndicator title="Alt kateqoriyalar" path="/subCategory" iconClassName='fa-solid fa-layer-group'/>

      

        </div>
    </div>
  )
}

export default Sidebar