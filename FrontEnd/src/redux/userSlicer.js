import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null
}

const userSlicer=createSlice({
    name:"user",
    initialState,
    reducers : {
       setUserState : (state,action)=>{
        state.user=action.payload
        
       }
       
    }
})

export const {setUserState} =userSlicer.actions

export default  userSlicer.reducer