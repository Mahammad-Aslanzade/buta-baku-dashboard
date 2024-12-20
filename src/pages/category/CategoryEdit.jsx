import React, { useContext, useEffect, useState } from 'react'
import InputField from '../../components/inputs/InputField';
import ImageInput from '../../components/inputs/ImageInput';
import SaveBtn from '../../components/buttons/SaveBtn';
import { ApiUrlContext } from '../../context/ApiUrlContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/loader-warnings/Loading';
import LoadingFail from '../../components/loader-warnings/LoadingFail';
import Table from '../../components/Table';
import { mealTableColumns } from '../../data/JsonStructures';
import areYouSureToDelete from '../../components/alert/AreYouSureToDelete';

const CategoryEdit = () => {
  
  const {baseUrl , headers} = useContext(ApiUrlContext);
  const navigate = useNavigate();
  const {id} = useParams();

  const [loading , setLoading] = useState(true);
  const [error , setError] = useState(null);

  // For Products
  const [allProducts , setAllProducts] = useState();
  const [productLoading , setProductLoading] = useState(true);
  const [showMeals , setShowMeals] = useState(true);

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

    axios.get(`${baseUrl}/v1/product` , {headers})
    .then((res)=>{
      const data = res.data;
      setAllProducts(data);
      setProductLoading(false);
    })
    .catch((res)=>{
      setAllProducts([]);
      setProductLoading(false);
    })

  },[])

  const delteFunc =(id)=>{
  
    const deleteReq=()=>{
      const link= `${baseUrl}/v1/product/${id}`;
      axios.delete(link , {headers})
      .then((res)=>{
        if(res.status == 204){
          window.location.reload();
        }
      })
      .catch((err)=>{
        console.log(err);
        Swal.fire("Something went wrong");
      })
    }

    areYouSureToDelete(deleteReq);
    
  }

  const editFunc =(id)=>{
    navigate(`/product/${id}`)
  }

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


              <div className="dropdown my-5">
                <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Kontenti Seç
                </button>
                <ul className="dropdown-menu bg-dark">

                  <li onClick={()=> setShowMeals(true)} className={`text-white my-1 py-1 ${showMeals ? "bg-primary" : "bg-secondary"}`}>
                    <p className='p-1' style={{margin: "0", cursor: "pointer"}}>Daxilindəki Yeməklər</p>
                  </li>

                  <li onClick={()=> setShowMeals(false)} className={`text-white my-1 py-1 ${!showMeals ? "bg-primary" : "bg-secondary"}`}>
                    <p className='p-1' style={{margin: "0", cursor: "pointer"}}>
                      Daxilindəki Kateqoriyalar
                    </p>
                  </li>

                </ul>
              </div>

              {
                !showMeals ?

                <>
                  <div className="subcategories-content my-5 pb-4">
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
                </>

                :

                productLoading ? <Loading /> :

                <>
                  <h2 className='add-page-label mt-5'>Daxilindəki Yeməklər</h2>

                  <Table 
                    allData={allProducts.filter((product)=> product.subCategory.categoryId == id)}
                    defaultElementPerPage={5}
                    optionsPerPage={[5, 10, 20]}
                    tableColumns={mealTableColumns}
                    navigateDetailFunc={editFunc}
                    deleteFunc={delteFunc}
                  />
                </>
              }
              {

                
              }


          </div>
        }
    </div>
  )
}

export default CategoryEdit