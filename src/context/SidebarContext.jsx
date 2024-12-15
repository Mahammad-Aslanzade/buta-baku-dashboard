import { useState,createContext } from "react";

export const SidebarContext = createContext();

export const SideBarProvider =(props)=>{
    const [sidebarOpen,setSidebarOpen] = useState(true);
      

  return  <SidebarContext.Provider value={[sidebarOpen,setSidebarOpen]}>
        {props.children}
    </SidebarContext.Provider>
    
}