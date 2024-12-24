import React, { useContext, useState , useEffect } from 'react'
import InputField from '../../components/inputs/InputField';
import SaveBtn from '../../components/buttons/SaveBtn';
import { ApiUrlContext } from '../../context/ApiUrlContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/loader-warnings/Loading';
import LoadingFail from '../../components/loader-warnings/LoadingFail';
import Swal from 'sweetalert2';

const MealRow = () => {
  
  const {baseUrl , headers} = useContext(ApiUrlContext);
  const {id} = useParams();

  const [position , setPosition] = useState();
  const [titleAZ , setTitleAz] = useState();

  const [loading , setLoading] = useState(true);
  const [error , setError] = useState(false);

  //Settings
  const apiEndPoint = "v1/product";

  const handleSubmit=(e)=>{
    e.preventDefault();

    const requestBody = {
        position : position/1
    }
    
    
    axios.put(`${baseUrl}/${apiEndPoint}/${id}`, requestBody , {headers})
    .then((res)=>{        
        Swal.fire(({
            icon: "success",
            text: `${titleAZ} sırası dəyişdi !`
        }))
        .then(()=>{
            window.history.back();
        })
    })
    .catch((err)=>{
        console.log(err);
        const errData = err.response.data;
        let errorIndicatorText;
        if(err.status == 500){
            errorIndicatorText = "Xəta baş verdi !"
        }else{
            errorIndicatorText= errData.error;
        }
        Swal.fire(({
            icon: "error",
            text: errorIndicatorText
        }))
    })
    
  }

  useEffect(()=>{
    axios.get(`${baseUrl}/${apiEndPoint}/${id}` , {headers})
    .then((res)=>{
        const data = res.data;
        setPosition(data.position);
        setTitleAz(data.titleAZ);        
        setLoading(false);
    })
    .catch(()=>{
        setLoading(false);
        setError(true);
    })
  },[])

  return (
    <div className='add-page-container container'>        
        <h2 className='add-page-label'>{titleAZ}</h2>

        {
          (loading) ?
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

                  <SaveBtn />

              </form>

          </div>    
        }
    </div>
  )
}

export default MealRow