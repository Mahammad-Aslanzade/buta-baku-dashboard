import React, { useContext, useEffect, useState } from "react";
import Table from "../../components/Table";
import SearchInput from "../../components/SearchInput";
import { filterFunction } from "../../utils/filterData";
import { ApiUrlContext } from "../../context/ApiUrlContext";
import axios from "axios";
import PageHead from "../../components/PageHead";
import Loading from "../../components/loader-warnings/Loading";
import LoadingFail from "../../components/loader-warnings/LoadingFail";
import areYouSureToDelete from "../../components/alert/AreYouSureToDelete";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Meal = () => {

  const {baseUrl , headers}  = useContext(ApiUrlContext);
  const navigate = useNavigate();

  const [loading , setLoading] = useState(true);
  const [error , setError] = useState(null);  

  const [allData , setAllData] = useState([]);
  const [filteredData , setFilteredData] = useState(allData);

  //Settings
  const apiEndPoint = "v1/product";
  const pagePath = "/product";
  const pageTitle = "Yeməklər";
  const tableColumns = [
    {
        label : "Şəkil",
        fieldProperties : {
          fieldPath : ["image"],
          image : true 
        },
    },
    {
      label : "Ad",
      fieldProperties : {
        fieldPath : ["titleAZ"]
      }
    },
    {
      label : "Kateqoriya",
      fieldProperties : {
        fieldPath : ["subCategory" , "category" , "titleAZ"]
      }
    },
    {
      label : "Qiymət",
      fieldProperties : {
        fieldPath : ["price"]
      }
    },
  ]


  const delteFunc =(id)=>{
  
    const deleteReq=()=>{
      const link= `${baseUrl}/${apiEndPoint}/${id}`;
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
    navigate(`${pagePath}/${id}`)
  }

  
  useEffect(()=>{
    axios.get(`${baseUrl}/${apiEndPoint}` , {headers})
    .then((res)=>{
      
      const data = res.data;
      setAllData(data);
      setFilteredData(data);
      setLoading(false);
    })
    .catch((err)=>{
      console.log(err);
      
      setLoading(false);
      setError(true);
    })
  },[])

 
  return (
    <div className="page-container">

      <PageHead 
        label={pageTitle}
        btnPath={`${pagePath}/add`}
      />

      <SearchInput
        onChangeFunc={(e)=> filterFunction(e.target.value , "titleAZ" , allData ,  setFilteredData) }
      />

      {
        loading ? 

        <Loading />
        : 
        error ? <LoadingFail />
        
        :
        
        <Table 
          allData={filteredData}
          defaultElementPerPage={5}
          optionsPerPage={[5, 10, 20]}
          tableColumns={tableColumns}
          navigateDetailFunc={editFunc}
          deleteFunc={delteFunc}
        />
      }


    </div>
  );
};

export default Meal;