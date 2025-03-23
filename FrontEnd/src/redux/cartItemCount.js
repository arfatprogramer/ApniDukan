import { createSlice } from '@reduxjs/toolkit'


export const cartItemCount = createSlice({
  name: 'count',
  initialState: {
    count: 0
  },
  reducers: {
   setCartItemsCount:(state,action) =>{
    state.count = action.payload 
   }
  }
})

// Action creators are generated for each case reducer function
export const { setCartItemsCount } = cartItemCount.actions

export default cartItemCount.reducer