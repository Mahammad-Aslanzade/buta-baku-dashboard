import React, { useContext, useEffect, useState } from 'react'
import InputField from '../../components/inputs/InputField';
import ImageInput from '../../components/inputs/ImageInput';
import SaveBtn from '../../components/buttons/SaveBtn';
import { ApiUrlContext } from '../../context/ApiUrlContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../../components/loader-warnings/Loading';
import LoadingFail from '../../components/loader-warnings/LoadingFail';

const CampaignEdit = () => {
  
  const {id} = useParams();
  const {baseUrl , headers} = useContext(ApiUrlContext);
  const navigate = useNavigate();

  const [loading , setLoading] = useState(true);
  const [error , setError] = useState(null);

  const apiEndPoint = "v1/campaign";
  const pagePath = "/campaign";


  const [titleAZ , setTitleAZ] = useState();
  const [titleEN , setTitleEN] = useState();
  const [photo , setPhoto] = useState();
  const [textEN , setTextEN] = useState();
  const [textAZ , setTextAZ] = useState();

  const [sendPhoto , setSendPhoto] = useState();
 
  useEffect(()=>{
    axios.get(`${baseUrl}/${apiEndPoint}/${id}` , {headers})
    .then((res)=>{
      const data = res.data;
      
      setTitleAZ(data.titleAZ);
      setTitleEN(data.titleEN);
      setPhoto(data.image);
      setTextEN(data.textEN);
      setTextAZ(data.textAZ);

      setLoading(false);
    })
    .catch(()=>{
      setLoading(false);
      setError(true);
    })
  },[])

  const handleSubmit=(e)=>{
    e.preventDefault();

    const formData= new FormData();    

    if(sendPhoto){
      formData.append('image' , sendPhoto)
    }
    
    formData.append('titleAZ' , titleAZ)
    formData.append('titleEN' , titleEN)
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
        
        <h2 className='add-page-label'>Kampaniya | {titleAZ}</h2>
        
        {
          loading ?
          <Loading />
          : 
          error ? <LoadingFail />
          :
          
          <div className="add-page-content">

              <form onSubmit={handleSubmit}>

                  <ImageInput 
                    label="Photo"
                    isEditing={true}
                    image={photo}
                    sendImage={sendPhoto}
                    setSendImage={setSendPhoto}
                  />

                <hr />
                  <InputField 
                    label="Başlaq (AZ)"
                    defaultValue={titleAZ}
                    setState={setTitleAZ}
                    required={true}
                  />

                  <InputField 
                    label="Başlaq (EN)"
                    defaultValue={titleEN}
                    setState={setTitleEN}
                    required={true}
                  />

                <hr />
                  <InputField 
                    label="Təsvir (AZ)"
                    defaultValue={textAZ}
                    setState={setTextAZ}
                  />

                  <InputField 
                    label="Təsvir (EN)"
                    defaultValue={textEN}
                    setState={setTextEN}
                  />
                <hr />


                  <SaveBtn />

              </form>

          </div>
        }

    </div>
  )
}

export default CampaignEdit