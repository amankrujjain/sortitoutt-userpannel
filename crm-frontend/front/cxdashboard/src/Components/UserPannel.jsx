import React from "react";
import {useNavigate} from 'react-router-dom'

import DataTable from "./DataTable";

export default function UserPannel() {
 
  const navigate = useNavigate()


  const editProfile = ()=>{
    navigate('/edit-profile')
   
  }

//  const cOrder = ()=>{
//   navigate('/create-order')
//  } 
  // const getData = async()=>{
  //   console.log('inside')
  //   let data = await fetch('http://localhost:8000/user')
  //   let userData = await data.json()
  //   console.log(userData.data[0].name)
  //   return userData
  // }

  // useEffect(()=>{
  //   getData()

  //   // console.log(finalData)

  // },[])

  return (
    <>
      <div className="bg-gray-200 pb-10">
        {/* Page title starts */}
        <div className="bg-gray-800 pt-8 pb-16 relative z-10">
          <div className="container px-6 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between">
            <div className="flex-col flex lg:flex-row items-start lg:items-center">
              <div className="flex items-center">
                <img className="border-2 shadow border-gray-600 rounded-full mr-3" src="https://cdn.tuk.dev/assets/webapp/master_layouts/boxed_layout/boxed_layout2.jpg" alt="logo" />
                <div>
                  <h5 className="text-sm text-white leading-4 mb-1">Raj verma</h5>
                  <p className="text-xs text-gray-400 leading-4">ID- 1156</p>
                </div>
              </div>
              <div className="ml-0 lg:ml-20 my-6 lg:my-0">
                <h4 className="text-2xl font-bold leading-tight text-white mb-2">Dashboard</h4>
                <p className="flex items-center text-gray-300 text-xs">
                  <span>Portal</span>
                  <span className="mx-2">&gt;</span>
                  <span>Dashboard</span>
                  <span className="mx-2">&gt;</span>
                  <span>Profile</span>
                </p>
              </div>
            </div>
            <div>
              <button onClick={editProfile} className="focus:outline-none transition duration-150 ease-in-out hover:bg-gray-200 border bg-white rounded text-indigo-700 px-8 py-2 text-sm">Edit Profile</button>
            </div>
          </div>
        </div>
        {/* Page title ends */}
        <div className="container flex justify-center mt-4 px-6 mx-auto height">
            <DataTable/>
        </div>
      </div>
    </>
  );
}
