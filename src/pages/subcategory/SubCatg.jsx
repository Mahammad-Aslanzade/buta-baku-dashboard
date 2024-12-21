import React, { useContext, useEffect, useState } from "react";
import Table from "../../components/Table";
import { ApiUrlContext } from "../../context/ApiUrlContext";
import axios from "axios";
import PageHead from "../../components/PageHead";
import Loading from "../../components/loader-warnings/Loading";
import LoadingFail from "../../components/loader-warnings/LoadingFail";
import areYouSureToDelete from "../../components/alert/AreYouSureToDelete";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { filterFunction } from "../../utils/filterData";
import SearchInput from "../../components/SearchInput";
import { sortForPosition } from "../../utils/sortData";


const SubCatg = () => {

  const {baseUrl , headers}  = useContext(ApiUrlContext);
  const navigate = useNavigate();

  const [loading , setLoading] = useState(true);
  const [error , setError] = useState(null);  

  const [allData , setAllData] = useState([]);
  const [filteredData , setFilteredData] = useState(allData);

  //Settings
  const apiEndPoint = "v1/subcategory";
  const pagePath = "/subCategory";
  const pageTitle = "Alt Kateqoriya";
  const tableColumns = [
    {
      label : "Sıra",
      fieldProperties : {
        fieldPath : ["position"]
      }
    },
    {
      label : "Ad",
      fieldProperties : {
        fieldPath : ["titleAZ"]
      }
    },
  ]


  const callDeleteApi=(id)=>{
    const link= `${baseUrl}/${apiEndPoint}/${id}`;
    
    axios.delete(link , {headers})
    .then((res)=>{        
      // console.log(res);
      window.location.reload();     
     })
    .catch((err)=>{
      const response = err.response.data;
      Swal.fire(JSON.stringify(response));
    })
  }

  const delteFunc =(id)=>{
  
    
    const deleteReq=()=>{
      const existProducts = allData.find((i)=> i.id == id).products;
      const titles =existProducts.map((item,c) => `<h5 className="fs-5">${c+1}. ${item.titleAZ}</h5>`).join('<br>');

      Swal.fire({
        icon: "warning",
        title: "Daxilinde olan məhsulları silməkdə əminsiniz !",
        showCancelButton: true,
        html: titles,
        footer: "<h5 class='text-warning'>Siyahıdakı məhsullarda silinəcəkdir</h5>"
      })
      .then((res)=>{
        if(res.isConfirmed){
          callDeleteApi(id);
        }
      })
      .catch(()=>{
        console.log("ERRR");
        
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
      const data = sortForPosition(res.data);
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

      <h5 className="text-white">Ümumi : {allData ? allData.length : ""}</h5>

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

export default SubCatg;
