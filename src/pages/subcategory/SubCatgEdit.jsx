import React, { useContext, useState , useEffect } from 'react'
import InputField from '../../components/inputs/InputField';
import SaveBtn from '../../components/buttons/SaveBtn';
import { ApiUrlContext } from '../../context/ApiUrlContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SelectionField from '../../components/inputs/SelectionField';
import Loading from '../../components/loader-warnings/Loading';
import LoadingFail from '../../components/loader-warnings/LoadingFail';
import axiosInstance from '../../configuration/axiosConfig';
import { sortForPosition } from '../../utils/sortData';
import ViewMore from '../../components/buttons/ViewMore';

const SubCatgEdit = () => {
  
  const {baseUrl , headers} = useContext(ApiUrlContext);
  const navigate = useNavigate();
  const {id} = useParams();

  const [loading , setLoading] = useState(true);
  const [loadingCategory , setLoadingCategory] = useState(true);
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

  const [thisCategoryProducts , setThisCategoryProducts] = useState();
 
  

  const handleSubmit=(e)=>{
    e.preventDefault();
    
    const reqBody= {    
      position : position,
      titleAZ : titleAZ,
      titleEN : titleEN,
      categoryId : selecetedCategory/1
    }
    
    axiosInstance.put(`${baseUrl}/${apiEndPoint}/${id}`, reqBody , {headers})
    .then((res)=>{
      navigate(pagePath)
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    axios.get(`${baseUrl}/${apiEndPoint}/${id}` , {headers})
    .then((res)=>{
      const data = res.data;
      setPosition(data.position);
      setTitleAZ(data.titleAZ);
      setTitleEN(data.titleEN);
      setSelectedCategory(data.categoryId);
      setThisCategoryProducts(data.products);      
      setLoading(false);
    })
    .catch(()=>{
      setLoading(false);
      setError(true);
    })

    axios.get(`${baseUrl}/${categoryEndPoint}` , {headers})
    .then((res)=>{
      setAllCategories(res.data)
      setLoadingCategory(false);
    })
    .catch(()=>{
      setLoadingCategory(false);
      setError(true);
    })
  },[])

  return (
    <div className='add-page-container container'>
        
        <h2 className='add-page-label'>{pageTitle}</h2>

        {
          (loading || loadingCategory) ?
          <Loading />
          : 
          error ? <LoadingFail />
          :

          <div className="add-page-content">

              <form onSubmit={handleSubmit}>

                  <InputField 
                      label="Sıra"
                      setState={setPosition}
                      numSteps='0'
                      inputType='number'
                      required={true}
                      defaultValue={position}
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

                  <SelectionField 
                    label="Kateqoriya"
                    setState={setSelectedCategory}
                    options={allCategories}
                    labelFieldName={"titleAZ"}
                    valueFieldName={"id"}
                    defaultValue={selecetedCategory}
                    loading={loading}
                  />

                  <SaveBtn />

              </form>

              <div className="subitems-content-box my-3">                
                <h3 className='add-page-label mt-5'>Daxilindəki Yeməklər : Ümumi({thisCategoryProducts.length})</h3>

                {
                  sortForPosition(thisCategoryProducts).map((item)=>{                    
                    return(
                      <div className='subitems-table-item' key={item.id} onClick={()=> navigate(`/product/${item.id}`)}>
                        <p className='item-label'>{item.position} : {item.titleAZ}</p>
                        <ViewMore 
                          label='Sırasını dəyiş' 
                          clickFunc={(e)=> {
                            e.stopPropagation();
                            navigate(`/product/${item.id}/changeRow`)
                          }}
                        />
                      </div>
                    )
                  })
                }
              </div>

          </div>
        }
        
    </div>
  )
}

export default SubCatgEdit