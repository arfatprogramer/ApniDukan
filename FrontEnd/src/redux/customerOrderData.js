import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    MyOrder: "",
   
}

const customerOrderData = createSlice({
    name: "MyOrder",
    initialState,

    reducers: {
        setMyorder: (state, action) => {
            state.MyOrder = action.payload
        },
       
    }

})
export const {setMyorder } = customerOrderData.actions
export default customerOrderData.reducer