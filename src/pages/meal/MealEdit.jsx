import React, { useContext, useEffect, useState } from 'react'
import InputField from '../../components/inputs/InputField';
import ImageInput from '../../components/inputs/ImageInput';
import SaveBtn from '../../components/buttons/SaveBtn';
import { ApiUrlContext } from '../../context/ApiUrlContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import TextAreaField from '../../components/inputs/TextAreaField';
import SelectionField from '../../components/inputs/SelectionField';
import Swal from 'sweetalert2';
import Loading from '../../components/loader-warnings/Loading';
import LoadingFail from '../../components/loader-warnings/LoadingFail';
import ListField from '../../components/inputs/ListField';

const MealEdit = () => {
  
  const {baseUrl ,headers} = useContext(ApiUrlContext);
  const navigate = useNavigate();
  const {id} = useParams();

  const [loading , setLoading] = useState(true);
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

  const [sendImage , setSendImage] = useState();

  const [selecetedCategoryObj , setSelectedCategoryObj] = useState();
  const [categories , setCategories] = useState();
  const [selectedCategoryId , setSelectedCategoryId] = useState();
  
  useEffect(()=>{

    axios.get(`${baseUrl}/${apiEndPoint}/${id}`, {headers})
    .then((res)=>{
      const data = res.data;
      setTitleEN(data.titleEN);
      setTitleAZ(data.titleAZ);
      setImage(data.image);
      setSubCategoryId(data.subCategoryId);
      setGram(data.gram);
      setPrice(data.price);
      setIngridientsAZ(data.ingridientsAZ);
      setIngridientsEN(data.ingridientsEN);
      setIsCombo(data.isCombo);
      setDescEN(data.descEN);
      setDescAZ(data.descAZ);
      
      setSelectedCategoryId(data.subCategory.category.id)
      setSubCategoryId(data.subCategoryId);

      setLoading(false);
    })
    .catch(()=>{
      setError(true);
      setLoading(false)
    })

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

    let requestBody;

    const formData= new FormData();    
    
    if(sendImage){
      formData.append('image' , sendImage);
      formData.append('subCategoryId' , subCategoryId);
      formData.append('titleEN' , titleEN);
      formData.append('titleAZ' , titleAZ);
      formData.append('gram' , gram);
      formData.append('price' , price);
      formData.append('isCombo' , isCombo);
      formData.append('descEN' , descEN);
      formData.append('descAZ' , descAZ);    
  
  
      if(ingridientsAZ){
        ingridientsAZ.map((i)=> formData.append('ingridientsAZ[]' , i))
      }
  
      if(ingridientsEN){
        ingridientsEN.map((i)=> formData.append('ingridientsEN[]' , i))
      }
      
      requestBody = formData;
    }else{

      requestBody = {
        subCategoryId : subCategoryId,
        ingridientsAZ: ingridientsAZ,
        ingridientsEN: ingridientsEN,
        titleEN : titleEN,
        titleAZ : titleAZ,
        gram : gram,
        price : price,
        isCombo : isCombo,
        descEN : descEN,
        descAZ : descAZ
      }
    }
    
    

    
    axios.put(`${baseUrl}/${apiEndPoint}/${id}`, requestBody, {headers})
    .then((res)=>{
      console.log("RESPONSE : " , res);
      navigate(pagePath)
    })
    .catch((err)=>{
        const data = err.response.data;
        Swal.fire(JSON.stringify(data));
    })
  }

  const comboText=()=>{
    return isCombo ? "SET" : "SADƏ"
  }

  return (
    <div className='add-page-container container'>
        
        <h2 className='add-page-label'>{pageTitle}</h2>
        
        {
          (loading || categoryLoading) ?
          <Loading />
          : 
          error ? <LoadingFail />
          :

            <div className="add-page-content">

                <form onSubmit={handleSubmit}>

                    <InputField
                        label="Ad (AZ)"
                        defaultValue={titleAZ}
                        setState={setTitleAZ}
                        required={true}
                    />
                    {console.log(titleAZ)}

                    <InputField
                        label="Ad (EN)"
                        defaultValue={titleEN}
                        setState={setTitleEN}
                        required={true}
                    />

                    <InputField
                        label="Qiymət (AZN)"
                        defaultValue={price}
                        inputType='number'
                        setState={setPrice}
                        required={true}
                    />

                    <ImageInput
                        label="Image"
                        isEditing={true}
                        image={image}
                        sendImage={sendImage}
                        setSendImage={setSendImage}
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
                        defaultValue={selectedCategoryId}
                        onchangeFunc={setSelectedCategoryObj}
                    />
                
                    <SelectionField 
                        label="Alt Kateqoriya"
                        setState={setSubCategoryId}
                        options={selecetedCategoryObj ? selecetedCategoryObj.subCategories : categories.find((i)=> i.id == selectedCategoryId).subCategories}
                        labelFieldName={"titleAZ"}
                        valueFieldName={"id"}
                        defaultValue={subCategoryId}
                    />

                    <hr />




                    {
                      !isCombo ?
                      <div className='my-5'>
                       <h2 className='add-page-label'>Yemək detalları</h2>
                          <TextAreaField 
                            label="Təsvir (AZ)"
                            defaultValue={descAZ}
                            setState={setDescAZ}
                          />

                        <TextAreaField 
                          label="Təsvir (EN)"
                          defaultValue={descEN}
                          setState={setDescEN}
                        />

                        <InputField
                          label="Ölçü"
                          defaultValue={gram}
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

export default MealEdit