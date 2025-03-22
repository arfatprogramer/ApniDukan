import { createSlice } from "@reduxjs/toolkit";

const initialState={
    product:"",
}
const conformProductSlicer=createSlice({
    initialState,
    name:"product",
    reducers:{
        setConfirmProduct:(state,action)=>{
            state.product=action.payload
            
        },
       
    }
})

export const {setConfirmProduct}=conformProductSlicer.actions
export default conformProductSlicer.reducer