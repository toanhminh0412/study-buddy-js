import React from "react";

export default function WarningMessage() {
    return (
        <div className="w-fit ml-8 mt-4 lg:ml-20 lg:mt-8 rounded-md border border-red-700 py-2 px-4 bg-red-100 text-center flex flex-col justify-center">
            <p className='text-lg lg:text-xl text-red-700'>Please fill out the missing fields</p>
        </div>
    )
}