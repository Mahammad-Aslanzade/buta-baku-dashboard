import React, { useContext, useState , useEffect } from 'react'
import InputField from '../../components/inputs/InputField';
import SaveBtn from '../../components/buttons/SaveBtn';
import { ApiUrlContext } from '../../context/ApiUrlContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SelectionField from '../../components/inputs/SelectionField';
import axiosInstance from '../../configuration/axiosConfig';
import { findFirstGap } from '../../utils/sortData';

const SubCatgAdd = () => {
  
  const {baseUrl , headers} = useContext(ApiUrlContext);
  const navigate = useNavigate();

  const [loading , setLoading] = useState(true);
  const [error , setError] = useState();

  //Settings
  const apiEndPoint = "v1/subcategory";
  const categoryEndPoint = "v1/category"
  const pagePath = "/subCategory";
  const pageTitle = "Alt Kateqoriya";

  const [position , setPosition] = useState();
  const [titleAZ , setTitleAZ] = useState();
  const [titleEN , setTitleEN] = useState();
  const [selecetedCategory , setSelectedCategory ]= useState();

  const [allCategories , setAllCategories] = useState();
   

  const handleSubmit=(e)=>{
    e.preventDefault();
    
    const reqBody= {    
      position : position/1,
      titleAZ : titleAZ,
      titleEN : titleEN,
      categoryId : selecetedCategory/1
    }
    
    axiosInstance.post(`${baseUrl}/${apiEndPoint}`, reqBody , {headers})
    .then((res)=>{
      navigate(pagePath)
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const [positionLoading , setPositionLoading] = useState(true);
  useEffect(()=>{
    axios.get(`${baseUrl}/${categoryEndPoint}` , {headers})
    .then((res)=>{
      setAllCategories(res.data)
      setLoading(false);
    })
    .catch(()=>{
      setLoading(false);
      setError(true);
    })
                          //subcatg
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

                <InputField 
                    label="Ad (AZ)"
                    setState={setTitleAZ}
                    required={true}
                />

                <InputField 
                    label="Ad (EN)"
                    setState={setTitleEN}
                />

                <SelectionField 
                  label="Kateqoriya"
                  setState={setSelectedCategory}
                  options={allCategories}
                  labelFieldName={"titleAZ"}
                  valueFieldName={"id"}
                  loading={loading}
                />

                <SaveBtn />

            </form>

        </div>
    </div>
  )
}

export default SubCatgAdd