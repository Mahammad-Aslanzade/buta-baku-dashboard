export const filterFunction =(value , searchKey , allData , setFilteredData)=>{    
    const filtered = allData.filter((i)=> i[`${searchKey}`].toString().toLowerCase().includes(value.toLowerCase()));
    setFilteredData(filtered)
  }