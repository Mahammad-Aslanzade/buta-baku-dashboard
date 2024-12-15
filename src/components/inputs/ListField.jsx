import React, { useState } from 'react'
import Swal from 'sweetalert2';

const ListField = ({label , list=[] , setList , defaultValue, placeholder}) => {

    const [focus , setFocus] = useState(false);
    const inputId = label + Math.random();

    const deleteFunc=(list , setList , item)=>{
        const newList = list.filter((i)=> i !== item );
        setList(newList);
    }
    
    return (
        <div className='list-field-input'>
            <hr />
            <div className="input-item">

                <div className="input-label">
                    <label htmlFor={inputId}>
                        {label}
                    </label>
                    
                    <i className={`fa-${focus ? "solid" : "regular"} fa-bookmark`}></i>
                </div>

                <div className="input-box-container flex-wrap">
                    <input id={inputId} type='text'  defaultValue={defaultValue} placeholder={placeholder}
                        onKeyDown={(event)=>{
                            if(event.key == 'Enter'){
                                event.preventDefault();
                                const value = event.target.value;
                                if(value == "" || value == " ") return;

                                const exist = list.find((i)=> i.toLowerCase() == value);
                                if(exist){
                                    Swal.fire(value + " already exist");
                                    return
                                }

                                const newList = [...list , value];
                                setList(newList);       
                                event.target.value = "";
                                
                            }
                        }}
                        onFocus={()=> setFocus(true)}
                        onBlur={()=> setFocus(false)}
                    />

                    <div className="list-box-container">
                        {
                            list.map((item)=>(
                                <p key={item} className='list-item' onClick={()=>deleteFunc(list , setList , item)}>{item}</p>
                            ))
                        }
                    </div>

                    <p className='delete-info-text'>Silmək üçün üzərinə klik edin</p>
                </div>

            </div>
            <hr />
        </div>
    )
}

export default ListField