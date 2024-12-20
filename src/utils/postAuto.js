import axios from "axios"

const baseUrl = "http://164.92.190.92/api";
  const headers = {
    Authorization : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJkZXZlbG9wZXJAYnV0YWJha3UuYXoiLCJpYXQiOjE3MzQzNDM0NzgsImV4cCI6MTczNDQyOTg3OH0.7jPbn8SE6p3GmCgucwhLypmq8FEcDCZaqwBh7W9c_a8`,
}

const data =   [
  {
    subCategoryId: 96,
    titleAZ: "Blinçik",
    titleEN: "Blinchik with cottage cheese",
    gram: "",
    descAZ: "(kəsmikli) (1ədəd)",
    descEN: "(curded) (1piece)",
    price: "2.00",
},

{
    subCategoryId: 96,
    titleAZ: "Blinçik Panko",
    titleEN: "Blinchik with meat",
    gram: "(1ədəd)",
    descAZ: "",
    descEN: "",
    price: "2.50",
},

{
    subCategoryId: 96,
    titleAZ: "Göy kətəsi",
    titleEN: "Panko",
    gram: "",
    descAZ: "",
    descEN: "",
    price: "6.00",
},

{
    subCategoryId: 96,
    titleAZ: "Qutab",
    titleEN: "Qutab",
    gram: "",
    descAZ: "(ət/göy/balqabaq/pendir) (1ədəd)",
    descEN: "(meat/greens/pumpkin/cheese) (piece)",
    price: "2.00",
},
{
    subCategoryId: 96,
    titleAZ: "Yarpaq Xəngəl",
    titleEN: "Yarpag khinkal",
    gram: "",
    descAZ: "",
    descEN: "",
    price: "8.00",
},

{
    subCategoryId: 96,
    titleAZ: "Gürcü Xəngəl",
    titleEN: "Georgian khinkali",
    gram: "",
    descAZ: "(5ədəd)",
    descEN: "(5pieces)",
    price: "8.00",
},

{
    subCategoryId: 96,
    titleAZ: "Gürzə",
    titleEN: "Gyurza",
    gram: "",
    descAZ: "(12 ədəd)",
    descEN: "(12 pieces)",
    price: "10.00",
},  
]
  
  

const postData=()=>{

    data.map((i)=>{
        axios.post(`${baseUrl}/v1/product`, i ,{headers})
    })
}

postData();