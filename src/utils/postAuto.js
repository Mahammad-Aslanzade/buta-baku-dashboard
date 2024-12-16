import axios from "axios"

const baseUrl = "http://164.92.190.92/api";
  const headers = {
    Authorization : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJkZXZlbG9wZXJAYnV0YWJha3UuYXoiLCJpYXQiOjE3MzQzNDM0NzgsImV4cCI6MTczNDQyOTg3OH0.7jPbn8SE6p3GmCgucwhLypmq8FEcDCZaqwBh7W9c_a8`,
}

const data =   [
    { subCategoryId: 30 ,titleAZ: "Künəfə", titleEN: "Künəfə", gram: "", price: 8.00 },
    { subCategoryId: 30 ,titleAZ: "Sütlü Nuriye", titleEN: "Sütlü Nuriye", gram: "", price: 9.00 },
    { subCategoryId: 30 ,titleAZ: "San Sebastian Cheesecake", titleEN: "San Sebastian Cheesecake", gram: "", price: 9.00 },
    { subCategoryId: 30 ,titleAZ: "Tiramisu", titleEN: "Tiramisu", gram: "", price: 8.00 },
    { subCategoryId: 30 ,titleAZ: "Ballı Tort", titleEN: "Ballı Tort", gram: "", price: 8.00 },
    { subCategoryId: 30 ,titleAZ: "Bakı Paxlavası", titleEN: "Bakı Paxlavası", gram: "(3ədəd)", price: 5.00 },
    { subCategoryId: 30 ,titleAZ: "Şəkərbura", titleEN: "Şəkərbura", gram: "(3ədəd)", price: 5.00 },
    { subCategoryId: 30 ,titleAZ: "Dondurma", titleEN: "Dondurma", gram: "(3top seçməli)", price: 5.00 },
    { subCategoryId: 30 ,titleAZ: "Meyvə Assorti", titleEN: "Meyvə Assorti", gram: "", price: 18.00 },
    { subCategoryId: 30 ,titleAZ: "Çay-Çaynik", titleEN: "Çay-Çaynik", gram: "", price: 5.00 },
    { subCategoryId: 30 ,titleAZ: "Çay Samovar", titleEN: "Çay Samovar", gram: "", price: 20.00 },
    { subCategoryId: 30 ,titleAZ: "Mürəbbələr", titleEN: "Mürəbbələr", gram: "", price: 5.00 },
    { subCategoryId: 30 ,titleAZ: "Çərəzlər", titleEN: "Çərəzlər", gram: "", price: 15.00 },
    { subCategoryId: 30 ,titleAZ: "Zoğal", titleEN: "Zoğal", gram: "", price: 5.00 },
    { subCategoryId: 30 ,titleAZ: "Vişnə", titleEN: "Vişnə", gram: "", price: 5.00 },
    { subCategoryId: 30 ,titleAZ: "Üzüm", titleEN: "Üzüm", gram: "", price: 5.00 }
  ]
  
  

const postData=()=>{

    data.map((i)=>{
        axios.post(`${baseUrl}/v1/product`, i ,{headers})
    })
}

postData();