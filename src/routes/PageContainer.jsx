import React from "react";
import { Route, Routes } from "react-router-dom";

//Instruction
import Instruction from "../pages/Instruction";

//About Us
import AboutUs from "../pages/mainSettings/AboutUs";

//Cateogry
import Category from "../pages/category/Category";
import CategoryAdd from "../pages/category/CategoryAdd";
import CategoryEdit from "../pages/category/CategoryEdit";

//Meal
import Meal from "../pages/meal/Meal";
import MealAdd from "../pages/meal/MealAdd";
import MealEdit from "../pages/meal/MealEdit";

//SubCategory
import SubCatg from "../pages/subcategory/SubCatg";
import SubCatgAdd from "../pages/subcategory/SubCatgAdd";
import SubCatgEdit from "../pages/subcategory/SubCatgEdit";


const PageContainer = () => {
  return (
    <Routes>
        <Route path="/" element={<Instruction />}></Route>

        {/* Main Settings */}
        <Route path="/mainSetting" element={<AboutUs />}></Route>

        {/* Camapign */}
        {/* <Route path="/campaign" element={<Campaign />}></Route> */}
        {/* <Route path="/campaign/add" element={<CampaignAdd />}></Route> */}
        {/* <Route path="/campaign/:id" element={<CampaignEdit />}></Route> */}
        
        {/* Meal */}
        <Route path="/product" element={<Meal />}></Route>
        <Route path="/product/add" element={<MealAdd />}></Route>
        <Route path="/product/:id" element={<MealEdit />}></Route>
        
        {/* Category */}
        <Route path="/category" element={<Category />}></Route>
        <Route path="/category/add" element={<CategoryAdd />}></Route>
        <Route path="/category/:id" element={<CategoryEdit />}></Route>
        
        {/* Sub Category */}
        <Route path="/subCategory" element={<SubCatg />}></Route>
        <Route path="/subCategory/add" element={<SubCatgAdd />}></Route>
        <Route path="/subCategory/:id" element={<SubCatgEdit />}></Route>

    </Routes>
  );
};

export default PageContainer;
