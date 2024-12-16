import React, { useContext, useEffect, useState } from 'react'
import InputField from '../../components/inputs/InputField';
import ImageInput from '../../components/inputs/ImageInput';
import SaveBtn from '../../components/buttons/SaveBtn';
import { ApiUrlContext } from '../../context/ApiUrlContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/loader-warnings/Loading';
import LoadingFail from '../../components/loader-warnings/LoadingFail';

const CategoryEdit = () => {
  
  const {baseUrl , headers} = useContext(ApiUrlContext);
  const navigate = useNavigate();
  const {id} = useParams();

  const [loading , setLoading] = useState(true);
  const [error , setError] = useState(null);

  //Settings
  const apiEndPoint = "v1/category";
  const pagePath = "/category";
  const pageTitle = "Kateqoriya";

  const [titleAZ , setTitleAZ] = useState();
  const [titleEN , setTitleEN] = useState();
  const [image , setImage] = useState();
  const [subCategories , setSubCategories] = useState();
 
  const [sendImage , setSendImage] = useState();

  const handleSubmit=(e)=>{
    e.preventDefault();

    const formData= new FormData();    
    formData.append('titleAZ', titleAZ);
    formData.append('titleEN', titleEN);

    if(sendImage){
      formData.append('image' , sendImage);
    }
    
    axios.put(`${baseUrl}/${apiEndPoint}/${id}`, formData , {headers})
    .then((res)=>{
      navigate(pagePath)
    })
    .catch((err)=>{
      console.log(err);
      
    })
  }

  useEffect(()=>{
    axios.get(`${baseUrl}/${apiEndPoint}/${id}`, {headers})
    .then((res)=>{
      const data = res.data;
      setTitleAZ(data.titleAZ);
      setTitleEN(data.titleEN);
      setImage(data.image);
      setSubCategories(data.subCategories);
      setLoading(false);
    })
    .catch(()=>{
      setLoading(false);
      setError(true);
    })
  },[])

  return (
    <div className='add-page-container container'>
        
        <h2 className='add-page-label'>{pageTitle}</h2>
        
        {
          loading ?
          <Loading />
          : 
          error ? <LoadingFail />
          :

          <div className="add-page-content">

              <form onSubmit={handleSubmit}>

                  <ImageInput 
                      image={image}
                      sendImage={sendImage}
                      setSendImage={setSendImage}
                      isEditing={true}
                  />

                  <InputField 
                      label="Ad (AZ)"
                      defaultValue={titleAZ}
                      setState={setTitleAZ}
                      required={true}
                  />

                  <InputField 
                      label="Ad (EN)"
                      defaultValue={titleEN}
                      setState={setTitleEN}
                  />

                  <SaveBtn />

              </form>

              <div className="subcategories-content my-3">
                <h2 className='add-page-label mt-5'>Daxilindəki alt kateqoriyalar</h2>
                <p className='text-white  mb-5'>Üzərinə klik edərək ətraflı məlumat ala bilərsiniz:</p>

                {
                  subCategories.map((item)=>{                    
                    return(
                      <p className='btn btn-secondary d-block text-start' onClick={()=> navigate(`/subCategory/${item.id}`)}>{item.titleAZ}</p>
                    )
                  })
                }
              </div>

          </div>
        }
    </div>
  )
}

export default CategoryEdit