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


const Campaign = () => {

  const {baseUrl , headers}  = useContext(ApiUrlContext);
  const navigate = useNavigate();

  const [loading , setLoading] = useState(true);
  const [error , setError] = useState(null);  

  const [allData , setAllData] = useState([]);
  const [filteredData , setFilteredData] = useState(allData);

  //Settings
  const apiEndPoint = "v1/campaign";
  const pagePath = "/campaign";
  const pageTitle = "Campaign";
  const tableColumns = [
    {
      label : "Şəkil",
      fieldProperties : {
        fieldPath : ["image"],
        image : true 
      }
    },
    {
      label : "Başlıq",
      fieldProperties : {
        fieldPath : ["titleAZ"]
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
      .catch(()=>{
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
    .catch(()=>{
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

      {/* <SearchInput
        onChangeFunc={(e)=> filterFunction(e.target.value , "name" , allData ,  setFilteredData) }
      /> */}

      {
        loading ? 

        <Loading />
        : 
        error ? <LoadingFail />
        
        :
        
        <Table 
          allData={filteredData}
          defaultElementPerPage={3}
          optionsPerPage={[3, 5, 10]}
          tableColumns={tableColumns}
          navigateDetailFunc={editFunc}
          deleteFunc={delteFunc}
        />
      }


    </div>
  );
};

export default Campaign;
