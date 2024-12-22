import axios from "axios";
import { deleteCookie } from "./cookie";

export const auth =(login , password)=>{
    
    const postBody = {
        "email" : login,
        "password": password
    }
    return axios.post("https://butabakurestaurant.az/api/v1/auth/login" , postBody)
    // return axios.post("http://localhost:8080/api/auth/login" , postBody)
}

export const logout =()=>{
    deleteCookie('token');
    deleteCookie('role');      
    deleteCookie('loginTime')
    
    window.location.reload();
}