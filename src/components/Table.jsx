import React, { useEffect, useMemo, useState } from 'react'
import DeleteBtn from './buttons/DeleteBtn';
import ViewMore from './buttons/ViewMore';
import { findNestedField } from '../utils/findNestedFieldObj';

const Table = ({defaultElementPerPage , disablePagination=false , optionsPerPage , allData , tableColumns , viewMore = true , deletable = true , deleteFunc=()=>{} , navigateDetailFunc=()=>{} }) => {

    
    //Fields for pagination 
    const [elementPerPage ,  setElementPerPage] = useState(defaultElementPerPage);
    const defaultButtonCount = Math.ceil(allData.length / defaultElementPerPage);
    const [buttons , setButtons] = useState(new Array(defaultButtonCount).fill(null));
    const [currentPage , setCurrentPage] = useState(1);
    const [goToPage , setGoToPage] = useState();

    
    useMemo(()=>{
        const buttonCount = Math.ceil(allData.length / elementPerPage);
        setButtons(new Array(buttonCount).fill(null));
        setCurrentPage(1);    
      },[elementPerPage ,allData])
  
    useEffect(()=>{
        setCurrentPage(1);
    },[allData])

  
    const rowContentGenerator=(data , fieldProperties , key)=>{    
        let field = findNestedField(data , fieldProperties.fieldPath);

            if(fieldProperties.image == true){
                return(
                    <td key={key} className="align-middle">
                        <img  width={100} height={100} src={field} alt="" />
                    </td>
                )

            }

            
            return(
                <td key={key} className="align-middle">{field}</td>
            )
    }


    return (
        <div className="table-container">

            {
                allData.length == 0 ? <h3 className='text-center text-white my-5'>Heçnə tapılmadı !</h3>
                :
                <>
                    <div className="table-content-container">
                    <table className="table content-table">
                        <thead>
                        <tr>
                            {
                                tableColumns.map((item , c)=>(
                                    <th key={c} scope="col">{item.label}</th>
                                ))
                            }
                            {
                            viewMore ?
                            <th key={Math.random()} scope="col">Daha çox</th>
                            :""
                            }
                            {
                            deletable ?
                            <th key={Math.random()} scope="col">Sil</th>
                            :""
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            allData.slice(elementPerPage*(currentPage-1) , elementPerPage*currentPage).map((item ,c)=>{
                            return(
                                <tr key={c}>
                                
                                {
                                    tableColumns.map((column , c)=>(
                                            rowContentGenerator(item , column.fieldProperties , c+Math.random())
                                    ))
                                }

                                {
                                    viewMore ?
                                    <td className="align-middle" key={c+Math.random()}>
                                    <ViewMore clickFunc={()=>navigateDetailFunc(item.id)}/>
                                    </td>
                                    :""
                                }

                                {
                                    deletable ?
                                    <td className="align-middle" key={c+Math.random()}>
                                    <DeleteBtn clickFunc={()=>deleteFunc(item.id)}/>
                                    </td>
                                    : ""
                                }
                                </tr>
                            )
                            })
                        }
                        
                        </tbody>
                        
                    </table>
                    </div>

                    {
                        !disablePagination ?

                        <div className="table-control-panel-container">

                        <div className="element-per-page">
                            <p>Say:</p>
                            <select defaultValue={defaultElementPerPage} onChange={(e)=> setElementPerPage(e.target.value)}>
                            {
                                optionsPerPage.map((i)=>(
                                <option key={i} value={i}>{i}</option>
                                ))
                            }
                            </select>
                        </div>

                        <div className="page-switcher">
                            {
                            buttons.map((i,c)=>{
                                return(
                                <button key={c} className={`mx-1 btn page-indicator ${c+1 == currentPage ? "indicator-active" : ""}`}
                                    onClick={()=> setCurrentPage(c+1)}
                                >
                                    {c+1}
                                </button>
                                )
                            })
                            }
                        </div>

                        <div className="page-number" onClick={()=>{

                        }}>
                            <button title="Change page" onClick={()=>{
                                if(goToPage <= buttons.length){
                                setCurrentPage(goToPage)
                                }
                            }}>
                            Səhifə : 
                            </button>
                            <input type="number" onChange={(e)=> setGoToPage(e.target.value)}/>
                        </div>
                        </div>

                        :
                        ""
                    }
                </>
            }
            

        </div>
    )
}

export default Table