import React, { useState } from "react";
const Card = () => {
    const[modal, showModal] = useState(true);
    return (
        <div>
                {modal && (
                        <div className="relative p-4 md:p-8 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400">
                            <div className="w-full flex justify-center text-gray-600 dark:text-gray-400 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-upload" width={56} height={56} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                                    <polyline points="7 9 12 4 17 9" />
                                    <line x1={12} y1={4} x2={12} y2={16} />
                                </svg>
                            </div>
                            <h1 className="text-center text-gray-800 dark:text-gray-100 font-lg font-bold tracking-normal leading-tight mb-4">Upload Files</h1>
                            <p className="mb-5 text-sm text-gray-600 dark:text-gray-400 text-center font-normal">Attach files for portfolio</p>
                            <div className="flex flex-col items-center justify-center w-full mb-8 border border-dashed border-indigo-700 rounded-lg py-8">
                                <div className="cursor-pointer mb-5 text-indigo-700 dark:text-indigo-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-cloud-upload" width={60} height={60} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
                                        <polyline points="9 15 12 12 15 15" />
                                        <line x1={12} y1={12} x2={12} y2={21} />
                                    </svg>
                                </div>
                                <p className="text-base font-normal tracking-normal text-gray-800 dark:text-gray-100 text-center">Drag and drop here</p>
                                <p className="text-base font-normal tracking-normal text-gray-800 dark:text-gray-100 text-center my-1">or</p>
                                <label htmlFor="fileUp" className="cursor-pointer text-base font-normal tracking-normal text-indigo-700 dark:text-indigo-600 text-center">
                                    {" "}
                                    browse{" "}
                                </label>
                                <input type="file" className="hidden" name="fileUpload" id="fileUp" />
                            </div>
                            <div className="flex items-center justify-center w-full">
                                <button className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">Submit</button>
                                <button className="focus:outline-none ml-3 bg-gray-100 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600 transition duration-150 text-gray-600 dark:text-gray-400 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onClick={()=>showModal(!modal)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                )}
        </div>
    );
};
export default Card;
