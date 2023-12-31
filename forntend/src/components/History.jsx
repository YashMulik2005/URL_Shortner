import axios from 'axios'
import React, { useEffect, useState } from 'react'

function History() {
    const [data, setdata] = useState()

    const getdata = async () => {
        const res = await axios.post("http://localhost:3000/url/getposts")
        console.log(res);
        setdata(res.data.data.result)
    }
    useEffect(() => {
        getdata()
    }, [])

    return (
        <div className=' grid grid-cols-3'>
            {data?.map((item, index) => {
                return <div className=' border-2 p-2 rounded-lg'>
                    <h1>{item.originalUrl}</h1>
                    <h1>{item.shortCode}</h1>
                </div>
            })}
        </div>
    )
}

export default History