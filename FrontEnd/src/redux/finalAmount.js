
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    amount:""
}
const conformAmountSlicer=createSlice({
    initialState,
    name:"amount",
    reducers:{
       
        setAmount:(state,action)=>{
            state.amount=action.payload
        }
    }
})

export const {setAmount}=conformAmountSlicer.actions
export default conformAmountSlicer.reducer