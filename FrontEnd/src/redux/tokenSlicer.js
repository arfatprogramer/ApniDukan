import { createSlice } from '@reduxjs/toolkit'


export const tokenSlicer = createSlice({
  name: 'token',
  initialState: {
    token: null
  },
  reducers: {
   setTokenDetails:(state,action) =>{
    state.token = action.payload 
   }
  }
})

// Action creators are generated for each case reducer function
export const { setTokenDetails } = tokenSlicer.actions

export default tokenSlicer.reducer