import React, { useContext, useEffect, useState } from 'react'
import { ApiUrlContext } from '../../context/ApiUrlContext';
import axios from 'axios';
import InputField from '../../components/inputs/InputField';
import SaveBtn from '../../components/buttons/SaveBtn';
import Loading from '../../components/loader-warnings/Loading';
import LoadingFail from '../../components/loader-warnings/LoadingFail';
import ImageInput from '../../components/inputs/ImageInput';
import ListField from '../../components/inputs/ListField';
import Swal from 'sweetalert2';

const AboutUs = () => {
  
  const {baseUrl , headers} = useContext(ApiUrlContext);

  const [loading , setLoading] = useState(true);
  const [error , setError] = useState();

  const [logo , setLogo] = useState();
  const [backgroundImage , setBackgroundImage] = useState();
  const [titleEN , setTitleEN] = useState();
  const [titleAZ , setTitleAZ] = useState();
  const [phoneNumbers , setPhoneNumbers] = useState();
  const [addressEN , setAddressEN] = useState();
  const [addressAZ , setAddressAZ] = useState();
  const [instagram , setInstagram] = useState();
  const [facebook , setFacebook] = useState();

  const [whatsapp , setWhatsapp] = useState();
  const [sendLogo , setSendLogo ] = useState();
  const [sendBackgroundImage , setSendBackgroundImage ] = useState();

  useEffect(()=>{
    axios.get(`${baseUrl}/v1/info` , {headers})
    .then((res)=>{        
        const data = res.data;
        setLogo(data.logo);
        setBackgroundImage(data.backgroundImage);
        setTitleEN(data.titleEN);
        setTitleAZ(data.titleAZ);
        setPhoneNumbers(data.phoneNumbers);
        setAddressEN(data.addressEN);
        setAddressAZ(data.addressAZ);
        setInstagram(data.instagram);
        setFacebook(data.facebook);
        setWhatsapp(data.whatsapp);
        
        setLoading(false);
    })
    .catch(()=>{
        setLoading(false);
        setError(true)
    })
  },[])
 

  const handleSubmit=(e)=>{
    e.preventDefault();

    const formData = new FormData();

    formData.append('logo' , sendLogo)
    formData.append('backgroundImage' , sendBackgroundImage)
    formData.append('titleEN' , titleEN)
    formData.append('titleAZ' , titleAZ)
    formData.append('addressEN' , addressEN)
    formData.append('addressAZ' , addressAZ)
    formData.append('instagram' , instagram)
    formData.append('facebook' , facebook)
    formData.append('whatsapp' , whatsapp)

    if(phoneNumbers){
        phoneNumbers.map((i)=>{
            formData.append('phoneNumbers[]' , i)
        })
    }

    axios.put(`${baseUrl}/v1/info` , formData  ,{headers})
    .then((res)=>{
        if(res.status == 200){
            Swal.fire({
              icon: "success",
              text: "You have successfully changed !!!",
            })
        }
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
        
    })


  }

  return (
    <div className='add-page-container container'>
        
        <h2 className='add-page-label'>Haqqımızda</h2>

        {
            loading ? <Loading />
            :
            error  ? <LoadingFail />
            :

            <div className="add-page-content">

                <form onSubmit={handleSubmit}>

                    <ImageInput 
                        label='Logo'
                        isEditing={true}
                        image={logo}
                        sendImage={sendLogo}
                        setSendImage={setSendLogo}
                    />

                    <ImageInput 
                        label='Arxa Plan'
                    
                        isEditing={true}
                        image={backgroundImage}
                        sendImage={sendBackgroundImage}
                        setSendImage={setSendBackgroundImage}
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
                        required={true}
                    />

                    <InputField 
                        label="Address (AZ)"
                        defaultValue={addressAZ}
                        setState={setAddressAZ}
                        required={true}
                    />

                    <InputField 
                        label="Address (EN)"
                        defaultValue={addressEN}
                        setState={setAddressEN}
                        required={true}
                    />  

                    <InputField 
                        label="Instagram"
                        defaultValue={instagram}
                        setState={setInstagram}
                        placeholder="Hesabınızın linkini yerləşdirin"
                    />                    

                    <InputField 
                        label="Facebook"
                        defaultValue={facebook}
                        setState={setFacebook}
                        placeholder="Hesabınızın linkini yerləşdirin"
                    />                    

                    <InputField 
                        label="Whatsapp"
                        defaultValue={whatsapp}
                        setState={setWhatsapp}
                        placeholder="Hesabınızın linkini yerləşdirin"
                    />     

                    <ListField 
                        label="Telefon nömrələri"
                        list={phoneNumbers}
                        setList={setPhoneNumbers}
                    />               

                    <SaveBtn />

                </form>

            </div>
        }
        
    </div>
  )
}


export default AboutUs