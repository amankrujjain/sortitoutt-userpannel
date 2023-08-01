import React, {createContext} from 'react'

export const Orders = createContext()

const addOrders = async(item)=>{
    const rawData = await fetch('/orders',{
      method:'post',
      headers:{
        "content-type":"application/json",
        "authorization":localStorage.getItem("token"),
        "username":localStorage.getItem('username')
      },
      body: JSON.stringify(item)
    })
    return await rawData.json()
}

const getOrders = async(item)=>{
  const rawData = await fetch('/orders',{
    method:'get',
    headers:{
      "content-type":"application/json",
      "authorization": localStorage.getItem("token"),
      "username":localStorage.getItem('username')
    }
  })
  return await rawData.json()
}

const getSingleOrders = async(item)=>{
  const rawData = await fetch('/orders' + item._id,{
    method:'get',
    headers:{
      "content-type":"application/json",
      "authorization": localStorage.getItem('token'),
      "username":localStorage.getItem("username")
    }
  })
  return await rawData.json()
}

const updateOrders = async(item)=>{
  const rawData = await fetch('/orders' + item._id,{
    method:'put',
    headers:{
      "content-type":"application/json",
      "authorization":localStorage.getItem("token"),
      "username":localStorage.getItem('username')
    },
    body: JSON.stringify(item)
  })
  return rawData.json()
}

const deleteOrders = async(item)=>{
  const rawData = await fetch('/orders'+ item._id,{
    method:'delete',
    headers:{
      "content-type":"application/json",
      "authorization":localStorage.getItem("token"),
      "username": localStorage.getItem("username")
    }
  })
  return await rawData.json()
}

function OrdersContextProvider(props) {
  return (
    <Orders.Provider value={{
        add: addOrders,
        get: getOrders,
        getSingle: getSingleOrders,
        update: updateOrders,
        delete: deleteOrders
    }}>
        {props.children}
    </Orders.Provider>
  )
}

export default OrdersContextProvider