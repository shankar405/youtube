import React, { useEffect } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../utils/chatSlice';

const LiveChat = () => {
const dispatch=useDispatch();
const chatMessages=useSelector((store)=>store.chat.message)

    useEffect(()=>{
        const i=setInterval(()=>{
            console.log("api"); 
            dispatch(addMessage({
                name:"shankar malviya",
                message:"thisd is a goof day "
            }))    
        },2000);

        return ()=>clearInterval(i);
    },[])

  return (
    <div className='w-full h-[600px] ml-2 p-2 border border-black bg-slate-100  overflow-y-scroll flex-col-reverse'>
        {chatMessages?.map((message,i)=>(<ChatMessage key={i} name={message.name} message={message.message}/>))}
      
    </div>
  )
}

export default LiveChat