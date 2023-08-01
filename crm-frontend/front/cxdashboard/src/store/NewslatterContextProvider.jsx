import React,{createContext} from 'react'

export const Newslatter = createContext()

const addNewslatter = async(item)=>{
  const rawData = await fetch('/newslatter',{
    method:'post',
    headers:{
      "content-type":"application/json",
      "authorization": localStorage.getItem('token'),
      "username":localStorage.getItem('username')
    },
    body: JSON.stringify(item)
  })
  return await rawData.json()
}

const getNewslatter = async(item)=>{
  const rawData = await fetch('/newslatter',{
    method:'get',
    headers:{
      "content-type":"application/json",
      "authorization":localStorage.getItem('token'),
      "username":localStorage.getItem('username')
    }
  })
  return await rawData.json()
}

const getSingleNewslatter = async(item)=>{
  const rawData = await fetch('/newslatter'+ item._id,{
    method:'get',
    headers:{
      "content-type":"application/json",
      "authorization": localStorage.getItem('token'),
      "username": localStorage.getItem('username')
    }
  })
  return await rawData.json()
}

const updateNewslatter = async(item)=>{
  const rawData = await fetch('/newslatter'+ item._id,{
    method:'update',
    headers:{
      "content-type":"application/json",
      "authorization": localStorage.getItem('token'),
      "username":localStorage.getItem('username')
    },
    body: JSON.stringify(item)
  })
  return await rawData.json()
}

const deleteNewslatter = async(item)=>{
  const rawData = await fetch('/newslatter'+ item._id,{
    method:'delete',
    headers:{
      "content-type":"application/json",
      "authorization":localStorage.getItem('token'),
      "username": localStorage.getItem('username')
    }
  })
  return await rawData.json()
}

function NewslatterContextProvider(props) {
  return (
    <Newslatter.Provider value={{
      add:addNewslatter,
      get:getNewslatter,
      getSingle:getSingleNewslatter,
      update: updateNewslatter,
      delete: deleteNewslatter
    }}>
      {props.children}
    </Newslatter.Provider>
  )
}

export default NewslatterContextProvider