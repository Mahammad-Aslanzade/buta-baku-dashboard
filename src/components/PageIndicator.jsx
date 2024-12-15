import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom'

const PageIndicator = ({path , title , iconClassName = "fa-solid fa-gear"}) => {
    const [active , setActive] = useState();

    const location = useLocation();

    useEffect(()=>{
        if(path == "/"){
          setActive(location.pathname =="/")
        }else{
          setActive(location.pathname.slice(1).includes(path.slice(1)))
        }
    }, [location])

  return (
    <LinkContainer to={path}>
            <div className={`page-indicator btn ${active ? "active-page" : ""}`}>
              <div className='page-switcher'>
                <i className={iconClassName}></i>
                <p className='title'>{title}</p>
              </div>
              <div className="indicator-frame">
                <i className="fa-solid fa-circle-dot"></i>
              </div>
            </div>
    </LinkContainer>
  )
}

export default PageIndicator