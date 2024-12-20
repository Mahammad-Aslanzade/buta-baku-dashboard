import React, { useContext, useEffect, useState } from "react";
import rules from "../data/rules.json";
import { ApiUrlContext } from "../context/ApiUrlContext";
import axios from "axios";
import Loading from "../components/loader-warnings/Loading";

const Instruction = () => {

   const { baseUrl , headers } = useContext(ApiUrlContext);
   const endpoint = "v1/info"

   const [loading , setLoading] = useState(true);
   const [error , setError] = useState(null);

   const [logo , setLogo] = useState();

   useEffect(()=>{
    axios.get(`${baseUrl}/${endpoint}` , {headers})
    .then((res)=>{
        setLogo(res.data.logo);
        setLoading(false);
    })
    .catch(()=>{
        setError(true);
        setLoading(false);
    })
   },[])

   return (
      <div className="instruction-container">

        {
            loading ? <Loading />
            :
            
            <>
                {
                    error ? "" :
                    <div style={{
                        width: "100%",
                        textAlign: "center"
                    }}>
                        <h2 className="head-text">Xoş gəmişsiniz!</h2>

                        <div className="logo-container pb-5"
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <div className="logo-img"
                                style={{
                                    width: "20%"
                                }}
                            >
                            <img src={logo} alt="" style={{width : "100%"}}/>
                            </div>
                        </div>
                    </div>
                }

                <h2 className="head-text">Təlimat</h2>

                <div className="rules-list">
                    {rules.rules.map((rule, c) => {
                    return (
                        <div className="rule-item" key={c}>
                            <i className="fa-solid fa-check"></i>
                            <p className="rule-text">{rule}</p>
                        </div>
                    );
                    })}
                </div>
            </>
        }
      </div>
   );
};

export default Instruction;
