import React from 'react'

const DeleteBtn = ({clickFunc}) => {
  return (
    <button className="btn-delete btn fw-semibold rounded-pill border-0 py-1 px-4" onClick={()=>clickFunc()}>Sil</button>
  )
}

export default DeleteBtn