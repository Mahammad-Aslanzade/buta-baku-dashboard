import React from 'react'
import rules from '../data/rules.json'

const Instruction = () => {


  return (
    <div className='instruction-container'>
        <h2 className='head-text'>Təlimat</h2>

        <div className="rules-list">

            {
                rules.rules.map((rule)=>{
                    return(
                        <div className="rule-item">
                            <i className="fa-solid fa-check"></i>
                            <p className='rule-text'>{rule}</p>
                        </div>
                    )
                })
            }

        </div>
    </div>
  )
}

export default Instruction