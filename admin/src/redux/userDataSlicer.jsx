import { createSlice } from '@reduxjs/toolkit'

export const userDataSlicer = createSlice({
  name: 'counter',
  initialState: {
    user: null
  },
  reducers: {
   setUserDetails:(state,action) =>{
    state.user = action.payload
   }
  }
})

// Action creators are generated for each case reducer function
export const { setUserDetails } = userDataSlicer.actions

export default userDataSlicer.reducer