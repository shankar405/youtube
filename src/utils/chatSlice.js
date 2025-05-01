import { createSlice } from "@reduxjs/toolkit";

const chatSlice=createSlice({
    name:"chat",
    initialState:{
        message:[{
            name:"hey",
            message:"user"
        }]
    },
    reducers:{
        addMessage:(state,action)=>{
            state.message(action.payload)
        }
    }
})

export const {addMessage}=chatSlice.actions;
export default chatSlice.reducer;