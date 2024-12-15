import React, { useState } from 'react'

const TextAreaField = ({label , setState, defaultValue , required = false , onchangeFunc=()=>{}}) => {

    const [focus , setFocus] = useState(false);
    const inputId = label + Math.random();
    
    return (
        <div className="input-item">
            <div className="input-label">
                <label htmlFor={inputId}>
                    {label}
                </label>
                
                <i className={`fa-${focus ? "solid" : "regular"} fa-bookmark`}></i>
            </div>

            <div className="input-box-container">
                <textarea id={inputId}  defaultValue={defaultValue} required={required}
                    onChange={(e)=>{
                        setState(e.target.value);
                        onchangeFunc();
                    }}
                    onFocus={()=> setFocus(true)}
                    onBlur={()=> setFocus(false)}
                />
            </div>

        </div>
    )
}

export default TextAreaField