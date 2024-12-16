import React, { useContext, useEffect, useState } from 'react'
import InputField from '../../components/inputs/InputField';
import ImageInput from '../../components/inputs/ImageInput';
import SaveBtn from '../../components/buttons/SaveBtn';
import { ApiUrlContext } from '../../context/ApiUrlContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextAreaField from '../../components/inputs/TextAreaField';
import SelectionField from '../../components/inputs/SelectionField';
import Loading from '../../components/loader-warnings/Loading';
import LoadingFail from '../../components/loader-warnings/LoadingFail';
import axiosInstance from '../../configuration/axiosConfig';

const MealAdd = () => {
  
  const {baseUrl ,headers} = useContext(ApiUrlContext);
  const navigate = useNavigate();

  const [categoryLoading , setCategoryLoading] = useState(true);
  const [error , setError] = useState(null);
  
  const [selectedCategory , setSelecetedCategory] = useState();
  //Settings
  const apiEndPoint = "v1/product";
  const categoryEndPoint = "v1/category";
  const pagePath = "/product";
  const pageTitle = "Yeməklər";
  
  //Request Body
  const [titleEN , setTitleEN] = useState();
  const [titleAZ , setTitleAZ] = useState();
  const [image , setImage] = useState();
  const [subCategoryId , setSubCategoryId] = useState();
  const [gram , setGram] = useState();
  const [price , setPrice] = useState();
  const [descEN , setDescEN] = useState();  
  const [descAZ , setDescAZ] = useState();  


  const [selecetedCategoryObj , setSelectedCategoryObj] = useState();
  const [categories , setCategories] = useState();
  
  useEffect(()=>{
    axios.get(`${baseUrl}/${categoryEndPoint}` , {headers})
    .then((res)=>{
        const data = res.data;
        setCategories(data);
        setCategoryLoading(false);
    })
    .catch(()=>{
        setCategoryLoading(false);
        setError(true);
    })

  },[])

  const handleSubmit=(e)=>{
    e.preventDefault();

    const formData= new FormData();    
    
    formData.append('image' , image);
    formData.append('subCategoryId' , subCategoryId);
    formData.append('titleEN' , titleEN);
    formData.append('titleAZ' , titleAZ);
    formData.append('gram' , gram);
    formData.append('price' , price);
    formData.append('descEN' , descEN);
    formData.append('descAZ' , descAZ);    

    const requestBody = new FormData();

    for(let  [key , value] of formData.entries()){      
      if(!(value== "undefined" || !value) ){
        requestBody.append(key , value);
      }
    }

    

    
    axiosInstance.post(`${baseUrl}/${apiEndPoint}`, requestBody, {headers})
    .then((res)=>{
      navigate(pagePath)
    })
    .catch((err)=>{
      console.log(err);
    })
  }


  return (
    <div className='add-page-container container'>
        
        <h2 className='add-page-label'>{pageTitle}</h2>
        
        {
          categoryLoading ?
          <Loading />
          : 
          error ? <LoadingFail />
          :

            <div className="add-page-content">

                <form onSubmit={handleSubmit}>

                    <InputField
                        label="Ad (AZ)"
                        setState={setTitleAZ}
                        required={true}
                    />

                    <InputField
                        label="Ad (EN)"
                        setState={setTitleEN}
                        required={true}
                    />

                    <InputField
                        label="Qiymət (AZN)"
                        setState={setPrice}
                        required={true}
                    />

                    <ImageInput
                        image={image}
                        setImage={setImage}
                        required={true}
                    />


                    <hr />
                    <p className='add-page-label fs-5'>Kateqoriya seçmək vacibdir!</p>
                    <SelectionField 
                        label="Kateqoriya"
                        options={categories}
                        labelFieldName={"titleAZ"}
                        valueFieldName={"id"}
                        setState={()=>{}}
                        onchangeFunc={setSelectedCategoryObj}
                    />

                    <SelectionField 
                        label="Alt Kateqoriya"
                        setState={setSubCategoryId}
                        options={selecetedCategoryObj ? selecetedCategoryObj.subCategories : []}
                        labelFieldName={"titleAZ"}
                        valueFieldName={"id"}
                    />

                    <hr />


                  <div className='my-5'>
                     <p className='add-page-label fs-5'>Yemək detalları</p>
                        <TextAreaField 
                        label="Təsvir (AZ)"
                        setState={setDescAZ}
                        />

                        <TextAreaField 
                          label="Təsvir (EN)"
                          setState={setDescEN}
                        />

                        <InputField
                          label="Ölçü"
                          setState={setGram}
                        />
                    </div>
                    



                    <SaveBtn />

                </form>

            </div>
        }
    </div>
  )
}

export default MealAdd