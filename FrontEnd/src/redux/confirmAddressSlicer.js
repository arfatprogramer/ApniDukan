import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    confirmAddress: "",
    userSelectedAddressIndex: 0,
}

const confirmAddressSlicer = createSlice({
    name: "confirmAddress",
    initialState,

    reducers: {
        setConfirmAddress: (state, action) => {
            state.confirmAddress = action.payload

        },
        setUserSelectedAddressIndex: (state, action) => {
            state.userSelectedAddressIndex = action.payload
        }
    }

})
export const { setConfirmAddress,setUserSelectedAddressIndex } = confirmAddressSlicer.actions
export default confirmAddressSlicer.reducer