import React, { useEffect, useState } from 'react'
import { messages } from '../common/ApiUrls'
import Title from '../components/Title'
import MessagesCart from '../components/MessagesCart'

const Messages = () => {
    const [data,setData]=useState([])

    const fetchMessage=async()=>{
        const server=await fetch(messages.url)
        const serverResponse=await server.json()
        if (serverResponse.success) {
            setData(serverResponse.data)   
        }
    }

    useEffect(()=>{
        fetchMessage()
    },[])

  return (
    <>
    <Title title='Messages' />
    <div className='w-full p-4 flex gap-4 flex-wrap'>

   
    {
      data.length ==0 ?(
        <div>No Messages</div>
      ):(
        
         data && <MessagesCart data={data} /> )
      
    }

</div>
    </>
  )
}

export default Messages
