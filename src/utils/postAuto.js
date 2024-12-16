import axios from "axios"

const baseUrl = "http://164.92.190.92/api";
  const headers = {
    Authorization : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJkZXZlbG9wZXJAYnV0YWJha3UuYXoiLCJpYXQiOjE3MzQzNDM0NzgsImV4cCI6MTczNDQyOTg3OH0.7jPbn8SE6p3GmCgucwhLypmq8FEcDCZaqwBh7W9c_a8`,
}

const data =   [
  { subCategoryId: 37, titleAZ: "Quzu Gərdan", titleEN: "Lamb Gardan", gram: "(250 qr.)", price: "15.00" },
  { subCategoryId: 37, titleAZ: "Çoban Qovurma", titleEN: "Choban govurma", gram: "(250 qr.)", price: "12.00" },
  { subCategoryId: 37, titleAZ: "Şəki Pitisi", titleEN: "Sheki piti", gram: "", price: "10.00" },
  { subCategoryId: 37, titleAZ: "Yarpaq Dolması", titleEN: "Grape leaves dolma", gram: "(200 qr.)", price: "9.00" },
  { subCategoryId: 37, titleAZ: "Pip Dolması", titleEN: "Pip dolma", gram: "(250 qr.)", price: "10.00" },
  { subCategoryId: 37, titleAZ: "Quzu Buğlama", titleEN: "Lamb bughlama", gram: "(250 qr.)", price: "10.00" },
  { subCategoryId: 37, titleAZ: "Dana Buğlama", titleEN: "Beef bughlama", gram: "", price: "10.00" },
  { subCategoryId: 37, titleAZ: "Nar Qovurma (Quzu Əti)", titleEN: "Lamb with roast pomegranate", gram: "(250 qr.)", price: "15.00" },
  { subCategoryId: 37, titleAZ: "Nar Qovurma (Can Əti)", titleEN: "Tenderloin with roast pomegranate", gram: "(250 qr.)", price: "18.00" },
  { subCategoryId: 37, titleAZ: "Cız-Bız", titleEN: "Jiz-biz lamb giblets", gram: "(250 qr.)", price: "10.00" },
  { subCategoryId: 37, titleAZ: "Can Əti (turşulu\\şabaladlı)", titleEN: "Tenderloin with plums and chestnuts", gram: "(250 qr.)", price: "15.00" },
  { subCategoryId: 37, titleAZ: "Şabaladlı Maça Qovurma", titleEN: "Lamb shank with chestnuts", gram: "(300 qr.)", price: "12.00" },
  { subCategoryId: 37, titleAZ: "Şirəli Dana", titleEN: "Juicy beef", gram: "(250 qr.)", price: "12.00" },
  { subCategoryId: 37, titleAZ: "Can Əti Qaymaqlı", titleEN: "Tenderloin in a creamy sauce", gram: "", price: "14.00" },
  { subCategoryId: 37, titleAZ: "Şirəli Xoruz", titleEN: "Juicy chicken", gram: "", price: "25.00" },
  { subCategoryId: 37, titleAZ: "Qaymaqlı Çolpa", titleEN: "Chicken in a creamy sauce", gram: "", price: "20.00" },
  { subCategoryId: 37, titleAZ: "Maça Peraşki", titleEN: "Lamb shank perashki", gram: "", price: "9.00" }

  ]
  
  

const postData=()=>{

    data.map((i)=>{
        axios.post(`${baseUrl}/v1/product`, i ,{headers})
    })
}

postData();