import React, {createContext} from 'react'

export const User = createContext()

const addUser = async(item)=>{
    const rawData = await fetch('/user',{
        method:'post',
        headers:{
            "content-type":"application/json",
            "authorization":localStorage.getItem("token"),
            "username":localStorage.getItem("username")
        },
        body: JSON.stringify(item)
    })
    return await rawData.json()
}

const getUser = async(item)=>{
    const rawData = await fetch('/user',{
        method:'get',
        headers:{
            "content-type":"application/json",
            "authorization":localStorage.getItem('token'),
            "username":localStorage.getItem("username")
        }
    })
    return await rawData.json()
}

const getSingleUser = async(item)=>{
    const rawData = await fetch('/user' + localStorage.getItem("userid"),{
        method:'get',
        headers:{
            "content-type":"application/json",
            "authorization": localStorage.getItem('token'),
            "username": localStorage.getItem('username')
        }
    })
    return await rawData.json()
}

const updateUser = async(item)=>{
    const rawData = await fetch('/user' + localStorage.getItem('userid'),{
        method:'put',
        headers:{
            "content-type":"application/json",
            "authorization": localStorage.getItem('token'),
            "username": localStorage.getItem('username')
        },
        body: JSON.stringify(item)
    })
    return await rawData.json()
}

const deleteUser = async(item)=>{
    const rawData = await fetch('/user' + item._id,{
        method:'delete',
        headers:{
            "content-type":"application/json",
            "authorization": localStorage.getItem("token"),
            "username": localStorage.getItem("username")
        }
    })
    return await rawData.json()
}

function UserContextProvider(props) {
  return (
    <User.Provider value={{
        add: addUser,
        get: getUser,
        getSingle: getSingleUser,
        update: updateUser,
        delete: deleteUser
    }}>
        {props.children}
    </User.Provider>
  )
}

export default UserContextProvider