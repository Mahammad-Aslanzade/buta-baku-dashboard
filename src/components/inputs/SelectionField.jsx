import React, { useState } from 'react'
import Loading from '../loader-warnings/Loading';

const SelectionField = ({loading = false ,label , options = [] , valueFieldName , labelFieldName , setState, defaultValue , required = false , onchangeFunc=()=>{}}) => {

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
                {
                    loading ? <Loading height={10} size={30}/>
                    :
                    <select id={inputId}  defaultValue={defaultValue} required={required}
                        onChange={(e)=>{
                            setState(e.target.value);
                            onchangeFunc(options.find( (i)=> i[`${valueFieldName}`] == e.target.value ));
                        }}
                        onFocus={()=> setFocus(true)}
                        onBlur={()=> setFocus(false)}
                    >
                        <option value={null}>Choose one of them</option>
                        {
                            options.map((i)=>(
                                <option key={i[`${valueFieldName}`]} value={i[`${valueFieldName}`]}>{i[`${labelFieldName}`]}</option>
                            ))
                        }
                    </select>
                }
            </div>

        </div>
    )
}

export default SelectionField