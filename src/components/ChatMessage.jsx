import React, { useEffect } from 'react'

const LiveChat=()=>{
    

}

const ChatMessage = ({name,message}) => {
  return (
    <div className='flex items-center shadow-sm p-2'>
        <img className='w-8' src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" alt='user-icon'/>
        <span className='m-2 font-bold' >{name}</span>
        <span >{message}</span>
    </div>
  )
}

export default ChatMessage