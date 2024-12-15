import React from 'react'
import { RingLoader } from 'react-spinners'

const Loading = ({height ,size=80}) => {
  return (
    <div className="loading-container" style={{"height" : height}}>
        <RingLoader 
            size={size}
            color='#721686'
        />
    </div>
  )
}

export default Loading