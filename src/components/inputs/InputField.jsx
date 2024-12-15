import React, { useState } from 'react'

const InputField = ({label , inputType = "text" , numSteps = "0.01", setState, defaultValue , required = false , placeholder , disabled = false , onchangeFunc=()=>{}}) => {

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
                <input id={inputId} type={inputType}  defaultValue={defaultValue} required={required} placeholder={placeholder}
                    onChange={(e)=>{
                        setState(e.target.value);
                        onchangeFunc();
                    }}
                    step={numSteps}
                    onFocus={()=> setFocus(true)}
                    onBlur={()=> setFocus(false)}
                    disabled={disabled}
                />
            </div>

        </div>
    )
}

export default InputField