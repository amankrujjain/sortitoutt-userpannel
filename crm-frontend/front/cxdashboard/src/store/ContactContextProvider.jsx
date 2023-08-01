import React,{createContext} from 'react'

export const Contact = createContext()

const addContact = async(item)=>{
    const rawData = await fetch('/contact',{
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

const getContact = async(item)=>{
    const rawData = await fetch('/contact',{
        method:'get',
        headers:{
            "content-type":"application/json",
            "authorization": localStorage.getItem('token'),
            "username":localStorage.getItem("username")
        }
    })
    return await rawData.json()
}

const getSingleContact = async(item)=>{
    const rawData = await fetch('/contact' + item._id,{
        method:'get',
        headers:{
            "content-type":"application/json",
            "authorization": localStorage.getItem("token"),
            "username":localStorage.getItem('username')
        }
    })
    return await rawData.json()
}

const deleteContact = async(item)=>{
    const rawData = await fetch('/contact' + item._id,{
        method:'delete',
        headers:{
            "content-type":"application/json",
            "authorization":localStorage.getItem("token"),
            "username":localStorage.getItem("username")
        }
    })
    return await rawData.json()
}

function ContactContextProvider(props) {
  return (
    <Contact.Provider value={{
        add: addContact,
        get: getContact,
        getSingle: getSingleContact,
        delete: deleteContact
    }}>
        {props.children}
    </Contact.Provider>
  )
}

export default ContactContextProvider