import React, { useState } from 'react'
import axios from 'axios'

function Urlform() {

    const [shorturl, setshorturl] = useState("")
    const [url, seturl] = useState("")
    const [error, seterror] = useState("")
    const handlesubmit = async (e) => {
        e.preventDefault()
        if (url == "") seterror("*URl required");

        if (url != "") {
            const res = await axios.post("http://localhost:3000/url/short", { originalUrl: url });
            setshorturl(res.data.data.url)
        }
        seturl("")
    }

    return (
        <div>
            <div className=' w-[100%] flex items-center justify-center my-6 sm:my-6 sm:m-8'>
                <form onSubmit={handlesubmit} className=' bg-[#F6F5F5] w-[90%] sm:w-[70%] border-[1px] shadow-lg rounded-lg flex justify-center items-center flex-col p-2'>
                    <label className=' font-bold'>URL Link:</label><br />
                    <input type='string ' value={url} onChange={(e) => {
                        seturl(e.target.value)
                    }} name='url' className='w-[80%] border-[1px] rounded-lg focus:outline-none px-4 py-[4px]' />
                    <h1 className=' text-red-500'>{error}</h1>
                    <button type='submit' className=' border-[1px] hover:bg-blue-600 hover:text-white rounded-lg px-3 m-3 font-bold py-[3px]'>Generate</button>
                </form>
            </div>
            <div className=' flex flex-col justify-center items-center'>
                <h1 className=' font-semibold'>Shorted URI is: </h1>
                <h1>{shorturl}</h1>
            </div>
        </div>
    )
}

export default Urlform