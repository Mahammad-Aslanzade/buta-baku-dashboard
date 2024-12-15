import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const PageHead = ({label, btnShown = true , btnPath}) => {
  return (
    <div className="page-head">
        <h2 className="page-title">{label}</h2>
        {
            btnShown ?
            <LinkContainer to={btnPath}>
                <button className="btn btn-add">Yeni</button>
            </LinkContainer>
            : ""
        }
    </div>
  )
}

export default PageHead