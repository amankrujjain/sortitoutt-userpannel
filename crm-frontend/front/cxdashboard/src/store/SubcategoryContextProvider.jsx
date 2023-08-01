import React,{createContext} from 'react'

export const Subcategory = createContext()

const addSubcategory = async(item)=>{
    const rawData = await fetch('/subcategory',{
        method:"post",
        headers:{
            "content-type":"application/json",
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")
        },
        body: JSON.stringify(item)
    })
    return await rawData.json()
}

const getSubcategory = async(item)=>{
    const rawData = await fetch('/subcategory',{
        method:"get",
        headers:{
            "contect-type":"application/json",
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")
        }
    })
    return await rawData.json()
}

const getSingleSubcategory = async(item)=>{
    const rawData = await fetch('/subcategory' + item._id,{
        method:"get",
        headers:{
            "content-type":"application/json",
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")
        }
    })
    return await rawData.json()
}

const updateSubcategory = async(item)=>{
    const rawData = await fetch('/subcategory' + item._id,{
        method:"put",
        headers:{
            "content-type":"application/json",
            "authorization": localStorage.getItem('token'),
            "username": localStorage.getItem("username")
        },
        body: JSON.stringify(item)
    })
    return await rawData.json()
}

const deleteSubcategory = async(item)=>{
    const rawData = await fetch('/subcategory' + item._id,{
        method:"delete",
        headers:{
            "content-type":"application/json",
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")
        }
    })
    return rawData.json()
}

function SubcategoryContextProvider(props) {
  return (
    <Subcategory.Provider value={{
        add :addSubcategory,
        get: getSubcategory,
        getSingle: getSingleSubcategory,
        update: updateSubcategory,
        delete: deleteSubcategory
    }}>
        {props.children}
    </Subcategory.Provider>
  )
}

export default SubcategoryContextProvider