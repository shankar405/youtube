import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constants';
import { searchResults } from '../utils/searchSlice';

const Head = () => {
  const [searchQuery,setSearchQuery]=useState("");
  const [suggestions,setSuggestions]=useState([]);
  const [showSuggestion,setShowSuggestion]=useState(false)

  const searchCache=useSelector((store)=>store.search);
  useEffect(()=>{
   const timer= setTimeout(()=>{
    if(searchCache[searchQuery]){
      setSuggestions(searchCache[searchQuery])
    }else{
    getSuggetions()}},200 )
    
    return ()=>{
   clearTimeout(timer);
    }
  },[searchQuery ])
 
  const getSuggetions= async()=>{
   const data=await fetch(YOUTUBE_SEARCH_API+searchQuery);
   const json=await data.json()
   setSuggestions(json[1]);
   dispatch(searchResults(
    {
      [searchQuery]:json[1]
    }
   ));
  }

 const dispatch=useDispatch();

  const toggleMenuHandler=()=>{
    const action=toggleMenu()
    dispatch(action);
  }
  
  
  return (
    <div className='grid grid-flow-col p-5 m-2 shadow-lg'>
        <div className='flex col-span-1  items-center'>
            <img onClick={()=>toggleMenuHandler()} className='h-8 cursor-pointer' 
            alt='hamburger-menu' 
            src="https://www.svgrepo.com/show/312300/hamburger-menu.svg"
            />
            <a href='/'>
            <img className='h-8 mx-2 '
            alt='youtube-logo'
            src="https://upload.wikimedia.org/wikipedia/commons/2/20/YouTube_2024.svg"
            /></a>
        </div>
        <div className='col-span-10  items-center '> 
          <div>
            <input className='px-5 w-1/2 border border-gray-400  p-2 rounded-l-2xl' 
            value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
            onFocus={()=>setShowSuggestion(true)}
            onBlur={()=>setShowSuggestion(false)}
            type='text'/>
            <button className='border border-gray-400 p-2 rounded-r-2xl bg-gray-100 '>Search</button>
            </div>
            {showSuggestion && (
                <div className='fixed shadow-lg rounded-lg bg-white py-2 px-5 w-[43rem] border-gray-100 '>
                <ul>
                  {suggestions?.map((s)=>{
                    return <li  key={s} className=' py-2 hover:bg-gray-200 '>{s} </li>
                  })}
                 
                </ul>
              </div>
            )}
          
        </div>
        <div className='col-span-1'>
            <img className='h-8'
            alt='user-icon'
            src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" />
        </div>
    </div>
  )
}

export default Head