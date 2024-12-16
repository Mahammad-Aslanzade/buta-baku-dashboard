import React, { useState } from 'react'

const SearchInput = ({onChangeFunc , defaultValue , placeholder = "Cədvəldən ada görə axtarın..."}) => {

  
  return (
    <div className="search-box-container">
        <input type="text" 
            placeholder={placeholder} 
            defaultValue={defaultValue}
            onChange={(e)=> onChangeFunc(e)}
        />
    </div>
  )
}

export default SearchInput