import React from 'react'

const ViewMore = ({label="Daha çox" , clickFunc}) => {
  return (
    <button className="btn-edit btn fw-semibold rounded-pill border-0 py-1 px-4" onClick={(e)=>clickFunc(e)}>{label}</button>
  )
}

export default ViewMore