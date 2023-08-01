import React, { useState } from 'react'

function CreateOrders() {

    const [check, setCheck] = useState('true')
    const [order, setOrder] = useState({
        clientName:"",
        orderNumber:"",
        maincategory:"",
        subcategory:"",
        dateOfPurchase:"",
        expectedDeliveryDate:"",
        productDeliveryDate:""
    })
    let name,value;
    const handleInputs = (e)=>{
        name = e.target.name
        value = e.target.value

        setOrder({...order,[name]:value})
        console.log(name)
        console.log(value)

    }

    let data = async()=>{
        let response = await fetch('http://localhost:8000/order',{
            method:'post',
            headers:{
                "content-type":'application/json'
            },
            body:JSON.stringify({
                clientName:order.clientName,
                orderNumber:order.orderNumber,
                maincategory:order.maincategory,
                subcategory:order.subcategory,
                dateOfPurchase:order.dateOfPurchase,
                expectedDeliveryDate:order.expectedDeliveryDate,
                productDeliveryDate:order.productDeliveryDate
            })
        })
        // let res = response.json()
        // console.log(res)
        if(response){
            console.log(response)
        }
        return await response.json()
    }

    const fun2 = (e) => {
        let item = e.target.value
        console.log(item)
        setCheck(item)
    }
    
    return (
        <>
            <div className=" fixed  w-full flex justify-center inset-0">
                <div className="mx-auto container">
                    <div className="flex items-center justify-center h-full w-full">
                        <div className="bg-white rounded-md shadow fixed overflow-y-auto sm:h-auto w-10/12 md:w-8/12 lg:w-1/2 2xl:w-2/5">
                            <div className="bg-gray-800 rounded-tl-md rounded-tr-md px-4 md:px-8 md:py-4 py-7 flex items-center justify-between">
                                <p className="text-base text-white font-semibold">Create New Order</p>
                            </div>
                            <div className="px-4 md:px-10 pt-6 md:pt-12 md:pb-4 pb-7">
                                <form className="mt-2 ">
                                    <label className=' font-medium leading-none text-gray-800'> Clients name</label>
                                    <input onChange={handleInputs} name='clientName' value={order.clientName} type='text' className=' w-full text-sm p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50' placeholder='Enter client name' />
                                    <label className=' font-medium leading-none text-gray-800'> Order Number</label>
                                    <input onChange={handleInputs} name='orderNumber' value={order.orderNumber} type='text' className=' w-full text-sm p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50' placeholder='Enter Order Number' />
                                    <label className=' font-medium leading-none text-gray-800'> Date Of Purchase</label>
                                    <input onChange={handleInputs} name='dateOfPurchase' value={order.dateOfPurchase} type='date' className=' w-full text-sm p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50'/>
                                    <label className=' font-medium leading-none text-gray-800'> Expected Delivery Date</label>
                                    <input onChange={handleInputs} name='expectedDeliveryDate' value={order.expectedDeliveryDate} type='date' className=' w-full text-sm p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50'/>
                                    <label className=' font-medium leading-none text-gray-800'>Delivery Date</label>
                                    <input onChange={handleInputs} name='productDeliveryDate' value={order.productDeliveryDate} type='date' className='mb-3 w-full text-sm p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50'/>
                                    <div className="flex items-center space-x-9">
                                        <div className="w-1/2 bg-white border rounded border-gray-200 py-2.5 px-3">
                                            <select onChange={fun2} className="text-sm text-gray-500 w-full focus:outline-none">
                                                <option selected disabled>
                                                    Pick One Maincategory
                                                </option>
                                                <option value={"digitalBundle"}>Digital Bundle</option>
                                                <option value={"individualPack"}>Individual Pack</option>
                                                <option value={"renewal"}>Renewal</option>
                                            </select>
                                        </div>
                                        <div className="w-1/2 bg-white border rounded border-gray-200 py-2.5 px-3">
                                            {
                                                check === 'digitalBundle' ?
                                                    <select onChange={fun2} className="text-sm text-gray-500 w-full focus:outline-none">
                                                        <option selected disabled>
                                                            Pick One Subcategory
                                                        </option>
                                                        <option value={'3 Months'}>3 Months</option>
                                                        <option value={'6 Months'}>6 Months</option>
                                                        <option value={'12 months'}>12 Months</option>
                                                    </select>
                                                    : check === 'individualPack' ?
                                                        <select onChange={fun2} className="text-sm text-gray-500 w-full focus:outline-none">
                                                            <option selected disabled>
                                                                Pick one Subcategory
                                                            </option>
                                                            <option value={"Web Development"}>Web Development</option>
                                                            <option value={'App Development'}>App Development</option>
                                                            <option value={'Pay Per Click'}>Pay Per Click</option>
                                                        </select>
                                                        :
                                                        <select onChange={fun2} className="text-sm text-gray-500 w-full focus:outline-none">
                                                            <option selected disabled>
                                                                Pick One Subcategory
                                                            </option>
                                                            <option value={'3 Months'}>3 Months</option>
                                                            <option value={'6 Months'}>6 Months</option>
                                                            <option value={'12 Months'}>12 Months</option>
                                                        </select>
                                            }
                                        </div>
                                    </div>
                                </form>
                                <div className="flex items-center justify-between mt-9">
                                    <button className="px-6 py-3 bg-gray-400 hover:bg-gray-500 shadow rounded text-sm text-white">
                                       Cancel 
                                    </button>
                                    <button onClick={data} className="px-6 py-3 bg-indigo-700 hover:bg-opacity-80 shadow rounded text-sm text-white">Place Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateOrders;

