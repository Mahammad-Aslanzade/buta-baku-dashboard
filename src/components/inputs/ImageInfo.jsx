import React from 'react'

const ImageInfo = ({size1 , size2}) => {
  return (
    <div className="input-file-box">
      <div className="text-box">
        <p className="img-size">Şəkil ölçü : {size1} x {size2} px</p>
        <div className="click-here">
          <span>Yükləmək üçün klik edin</span>
        </div>
      </div>
    </div>
  )
}

export default ImageInfo