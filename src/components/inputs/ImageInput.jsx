import React from 'react'
import ImageInfo from './ImageInfo';

const ImageInput = ({inputKey ,label="Şəkil" , image , setImage , sendImage , setSendImage , isEditing = false , size1 , size2}) => {
  
    const inputId = label + Math.random();


  return (
        <div className="input-item image-input">

            <div className="picture-frame">
                
                {
                    isEditing ? 
                    //edit edende
                    (
                        sendImage ? 
                            <img width={100} height={100}  src={URL.createObjectURL(sendImage)} alt="" />
                            :
                            <img width={100} height={100}  src={image} alt="" />
                    )
                    //edit edende

                    :

                    //post edende
                    (
                        image ?
                        <img width={100} height={100}  src={URL.createObjectURL(image)} alt="" />
                        :
                        ""
                    )
                    //post edende 


                }

            </div>

            <div className="input-label">
                <label htmlFor={inputId}>
                    {label}
                </label>
                
                <i className={`fa-${image ? "solid" : "regular"} fa-bookmark`}></i>
            </div>

            <div className="input-box-container">

                <label htmlFor={inputId}>
                    <ImageInfo size1={size1} size2={size2} />
                </label>

                <input id={inputId} type="file"
                    onChange={(e)=>{
                        const file = e.target.files[0];

                        if(isEditing){
                            setSendImage(file)
                        }else{
                            setImage(e.target.files[0]);
                        }
                    }}
                    hidden
                />
            </div>

        </div>
  )
}

export default ImageInput