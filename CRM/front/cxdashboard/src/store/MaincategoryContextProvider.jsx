import React,{createContext} from 'react'

export const Maincategory = createContext()

const addMaincategory = async(item)=>{
    var rawData = await fetch('/maincategory',{
        method:'post',
        headers:{
            "content-type":"application/json",
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")
        },
        body: JSON.stringify(item)
    })
    return await rawData.json()
}
const updateMaincategory = async(item)=>{
    const rawData = await fetch('/maincategory/'+ item._id,{
        method:'put',
        headers:{
            "content-type":"application/json",
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")
        },
        body: JSON.stringify(item)
    })
    return await rawData.json() 
}

const getMaincategory = async(item)=>{
    const rawData = await fetch("/maincategory",{
        method:"get",
        headers:{
            "content-type": "application/json",
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")
        }
    })
    return await rawData.json()
}

const getSingleMaincategory = async(item)=>{
    const rawData = await fetch('/maincategory/' + item._id,{
        method:'get',
        headers:{
            "content-type":"application/json",
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")
        }
    })
    await rawData.json()
}

const deleteMaincategory = async(item)=>{
    const rawData = await fetch('/maincategory/' + item._id,{
        method:"delete",
        headers:{
            "content-type":"application/json",
            "authorization" : localStorage.getItem("token"),
            "username":localStorage.getItem("username")
        }
    })
    return await rawData.json()
}

function MaincategoryContextProvider(props) {
  return (
    <Maincategory.Provider value={
        {
            add: addMaincategory,
            update : updateMaincategory,
            get: getMaincategory,
            getSingle : getSingleMaincategory,
            delete: deleteMaincategory
        }
    }>
        {props.children}
    </Maincategory.Provider>
  )
}

export default MaincategoryContextProvider