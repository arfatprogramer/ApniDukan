import { createSlice } from "@reduxjs/toolkit";
const initialState={
    address:[]
}

const addressSlicer=createSlice({
    name:"address",
    initialState,
    reducers:{
        setAddress:(state,action)=>{
            state.address=action.payload 
        }
    }

})

export const{setAddress}=addressSlicer.actions
export default addressSlicer.reducer