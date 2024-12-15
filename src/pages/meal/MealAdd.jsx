import React, { useContext, useEffect, useState } from 'react'
import InputField from '../../components/inputs/InputField';
import ImageInput from '../../components/inputs/ImageInput';
import SaveBtn from '../../components/buttons/SaveBtn';
import { ApiUrlContext } from '../../context/ApiUrlContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextAreaField from '../../components/inputs/TextAreaField';
import SelectionField from '../../components/inputs/SelectionField';
import Swal from 'sweetalert2';
import Loading from '../../components/loader-warnings/Loading';
import LoadingFail from '../../components/loader-warnings/LoadingFail';
import ListField from '../../components/inputs/ListField';
import axiosInstance from '../configuration/axiosConfig';

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
  const [ingridientsAZ , setIngridientsAZ] = useState();
  const [ingridientsEN , setIngridientsEN] = useState();
  const [isCombo , setIsCombo] = useState(false);
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
    // formData.append('ingridientsAZ' , ingridientsAZ);
    // formData.append('ingridientsEN' , ingridientsEN);
    formData.append('isCombo' , isCombo);
    formData.append('descEN' , descEN);
    formData.append('descAZ' , descAZ);    

    const requestBody = new FormData();

    for(let  [key , value] of formData.entries()){      
      if(!(value == null || value == "undefined")){
        requestBody.append(key , value);
      }
    }

    if(ingridientsAZ){
      ingridientsAZ.map((i)=> formData.append('ingridientsAZ' , i))
    }

    if(ingridientsEN){
      ingridientsEN.map((i)=> formData.append('ingridientsEN' , i))
    }

    

    
    axiosInstance.post(`${baseUrl}/${apiEndPoint}`, requestBody, {headers})
    .then((res)=>{
      console.log("RESPONSE : " , res);
      navigate(pagePath)
    })
    .catch((err)=>{
        const data = err.response;
        // Swal.fire(JSON.stringify(data));
    })
  }

  const comboText=()=>{
    return isCombo ? "SET" : "SADƏ"
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
                        inputType='number'
                        setState={setPrice}
                        required={true}
                    />

                    <ImageInput
                        label="Image"
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


                    <div className="dropdown text-center my-2">
                      <button className="btn btn-warning text-white dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {comboText()}
                      </button>
                      <ul className="dropdown-menu bg-dark">
                        <li><a className={`dropdown-item text-white ${!isCombo ? "bg-warning" : "bg-dark"}`} onClick={()=>setIsCombo(false)}>SADƏ</a></li>
                        <li><a className={`dropdown-item text-white ${isCombo ? "bg-warning" : "bg-dark"}`} onClick={()=>setIsCombo(true)}>SET</a></li>
                      </ul>
                    </div>


                    {
                      !isCombo ?
                      <div className='my-5'>
                       <h2 className='add-page-label'>Yemək detalları</h2>
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
                      
                      :

                      <div className='my-5'>
                        <h2 className='add-page-label'>Set detalları</h2>

                        <ListField 
                          label="Tərkibi (AZ)"
                          list={ingridientsAZ}
                          setList={setIngridientsAZ}
                          placeholder="Yazdıqdan sonra entərə klikləyin"
                        />

                        <ListField 
                          label="Tərkibi (EN)"
                          list={ingridientsEN}
                          setList={setIngridientsEN}
                          placeholder="Yazdıqdan sonra entərə klikləyin"
                        />
                      </div>
                    }
                    



                    <SaveBtn />

                </form>

            </div>
        }
    </div>
  )
}

export default MealAdd