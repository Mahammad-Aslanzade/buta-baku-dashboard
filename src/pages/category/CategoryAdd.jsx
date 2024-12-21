import React, { useContext, useEffect, useState } from 'react'
import InputField from '../../components/inputs/InputField';
import ImageInput from '../../components/inputs/ImageInput';
import SaveBtn from '../../components/buttons/SaveBtn';
import { ApiUrlContext } from '../../context/ApiUrlContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../configuration/axiosConfig';
import axios from 'axios';
import { findFirstGap } from '../../utils/sortData';

const CategoryAdd = () => {
  
  const {baseUrl , headers} = useContext(ApiUrlContext);
  const navigate = useNavigate();

  //Settings
  const apiEndPoint = "v1/category";
  const pagePath = "/category";
  const pageTitle = "Kateqoriya";

  const [position , setPosition] = useState();
  const [titleAZ , setTitleAZ] = useState();
  const [titleEN , setTitleEN] = useState();
  const [image , setImage] = useState();
 

  const handleSubmit=(e)=>{
    e.preventDefault();

    const formData= new FormData();    
    formData.append('position', position);
    formData.append('titleAZ', titleAZ);
    formData.append('titleEN', titleEN);
    formData.append('image' , image);
    
    axiosInstance.post(`${baseUrl}/${apiEndPoint}`, formData , {headers})
    .then((res)=>{
      navigate(pagePath)
    })
    .catch((err)=>{
      console.log(err);
    })

  }

  const [positionLoading , setPositionLoading] = useState(true);
  useEffect(()=>{
    axios.get(`${baseUrl}/${apiEndPoint}` , {headers})
    .then((res)=>{
      const data = res.data;
      setPosition(findFirstGap(data));
      setPositionLoading(false);
    })
    .catch(()=>{
      setPositionLoading(false);
    })
  },[])

  return (
    <div className='add-page-container container'>
        
        <h2 className='add-page-label'>{pageTitle}</h2>
        
        <div className="add-page-content">

            <form onSubmit={handleSubmit}>

                <InputField 
                    label="Sıra"
                    setState={setPosition}
                    numSteps='0'
                    inputType='number'
                    required={true}
                    defaultValue={position}
                    placeholder={positionLoading ? 'Boş pozisiya axtrılır ...' : ""}
                    disabled={positionLoading}
                />

                <ImageInput 
                    image={image}
                    setImage={setImage}
                    />

                <InputField 
                    label="Ad (AZ)"
                    setState={setTitleAZ}
                    required={true}
                />

                <InputField 
                    label="Ad (EN)"
                    setState={setTitleEN}
                />

                <SaveBtn />

            </form>

        </div>
    </div>
  )
}

export default CategoryAdd