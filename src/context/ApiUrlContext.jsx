import {createContext } from "react";
import { getCookie } from "../utils/cookie";

export const ApiUrlContext = createContext();

export const ApiUrlProvider =(props)=>{

  // const baseUrl = "http://localhost:8080/api";
  // const baseUrl = "http://164.92.190.92/api";
  // const baseUrl = "https://butabakurestaurant.az/api";
  const baseUrl = "https://butabakurestaurant.az/api";
  const headers = {
    Authorization : `Bearer ${getCookie('token')}`,
  }
      

  return  <ApiUrlContext.Provider value={{baseUrl , headers}}>
        {props.children}
    </ApiUrlContext.Provider>
    
}