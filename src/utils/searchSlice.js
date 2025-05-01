import { createSlice } from "@reduxjs/toolkit";

const searchSlice=createSlice({
    name:"search",
    initialState:{
       
    },
    reducers:{
        searchResults:(state,action)=>{
        return {...state,...action.payload};
        }
        
    }
})
export const {searchResults}=searchSlice.actions;
export default searchSlice.reducer; 