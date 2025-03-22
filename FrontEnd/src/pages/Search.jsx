import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { searchController } from '../common/apiData'
import SearchCart from '../components/SearchCart'


const Search = () => {
    const prams = useLocation()
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    
    const handelSearchApi=async()=>{
        // const searchParams = new URLSearchParams(prams.search)
        setLoading(true)
        const response=await fetch( searchController.url+prams.search)
        const responseData=await response.json()
        if (responseData.success) {
            setData(responseData.data)
        }
        setLoading(false)   
    }

    useEffect(() => {
        handelSearchApi()
    },[prams.search])

    return (
        <div className='container mx-auto p-4'>
        {/* it if for loading data from data base */}
            {loading && new Array(1).fill(null).map((el,index)=>{
               return <p className='text-lg text-center'>Loading...</p>
            })}

            <p>Search Results : {data.length}</p>

            {
                data.length === 0 && !loading && (
                    <p className="text-lg text-center p-4 bg-white">No Data Found...</p>
                )
            }

            {
                data.length>0 && !loading && (
                    <SearchCart loading={loading} data={data}/>
                )
            }
        </div>
    )
}

export default Search
