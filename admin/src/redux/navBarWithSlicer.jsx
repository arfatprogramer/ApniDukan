import { createSlice } from "@reduxjs/toolkit";

export const navBarWithSlicer=createSlice({
    name:"navBarWith",
    initialState:{
        value:{
            width:14,
            display:"hidden"
        }
    },
    reducers:{
    setNavBarWith:(state,action)=>{
        state.value.width=action.payload
    },
    setNavBarDisplay:(state,action)=>{
        state.value.display=action.payload
        
    },
},
})

export const  {setNavBarWith,setNavBarDisplay} = navBarWithSlicer.actions
export default  navBarWithSlicer.reducer