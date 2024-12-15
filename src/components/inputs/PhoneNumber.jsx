import React, { useState } from 'react'

const PhoneNumber = ({label , maxLength=10 , state , setState , onchangeFunc=()=>{}}) => {

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

            <div className="input-box-container phone-input">
                <h3>+</h3>
                <input id={inputId} type="number"
                    value={parseInt(state.replace("+",""))}
                    onChange={(e)=>{
                        setState("+" + e.target.value.toString());
                        onchangeFunc();
                    }}
                    onFocus={()=> setFocus(true)}
                    onBlur={()=> setFocus(false)}
                />

            </div>

                <span className='phone-max-length'>Maksimal uzunluq : {12}</span>
        </div>
    )
}

export default PhoneNumber