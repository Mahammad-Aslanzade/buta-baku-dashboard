import React, { useContext, useState } from 'react'
import InputField from '../../components/inputs/InputField';
import ImageInput from '../../components/inputs/ImageInput';
import SaveBtn from '../../components/buttons/SaveBtn';
import { ApiUrlContext } from '../../context/ApiUrlContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const CampaignAdd = () => {
  
  const {baseUrl , headers} = useContext(ApiUrlContext);
  const navigate = useNavigate();

  const apiEndPoint = "v1/campaign"
  const pagePath = "/campaign"

  const [titleAZ , setTitleAZ] = useState();
  const [titleEN , setTitleEN] = useState();
  const [photo , setPhoto] = useState();
  const [textEN , setTextEN] = useState();
  const [textAZ , setTextAZ] = useState();
 

  const handleSubmit=(e)=>{
    e.preventDefault();

    const formData= new FormData();    
    
    formData.append('titleAZ' , titleAZ)
    formData.append('titleEN' , titleEN)
    formData.append('image' , photo)
    formData.append('textEN' , textEN)
    formData.append('textAZ' , textAZ)

    
    axios.post(`${baseUrl}/${apiEndPoint}`, formData , {headers})
    .then((res)=>{
      console.log("RESPONSE : " , res);
      navigate(pagePath)
    })
    .catch((err)=>{
      const data = err.response.data;
      Swal.fire(JSON.stringify(data));
  })
  }

  return (
    <div className='add-page-container container'>
        
        <h2 className='add-page-label'>Banner | Add</h2>
        
        <div className="add-page-content">

            <form onSubmit={handleSubmit}>

                <ImageInput 
                  label="Photo"
                  image={photo}
                  setImage={setPhoto}
                />

              <hr />
                <InputField 
                  label="Başlaq (AZ)"
                  setState={setTitleAZ}
                  required={true}
                />

                <InputField 
                  label="Başlaq (EN)"
                  setState={setTitleEN}
                  required={true}
                />

              <hr />
                <InputField 
                  label="Təsvir (AZ)"
                  setState={setTextAZ}
                />

                <InputField 
                  label="Təsvir (EN)"
                  setState={setTextEN}
                />
              <hr />


                <SaveBtn />

            </form>

        </div>
    </div>
  )
}

export default CampaignAdd