import { createSlice } from "@reduxjs/toolkit";

const initialState={
    buy:[],
}
const buyProductSlicer=createSlice({
    initialState,
    name:"buy",
    reducers:{
        buyProduct:(state,action)=>{
            state.buy=action.payload   
        },
       
    }
})

export const {buyProduct}=buyProductSlicer.actions
export default buyProductSlicer.reducer