import { configureStore } from '@reduxjs/toolkit'
import userDataSlicer from'./userDataSlicer'
import navBarWithSlicer from './navBarWithSlicer'
import  tokenSlicer  from './tokenSlicer'

export default configureStore({
  reducer: {
    user:userDataSlicer,
    navbarWidth:navBarWithSlicer,
    token:tokenSlicer
  }
})