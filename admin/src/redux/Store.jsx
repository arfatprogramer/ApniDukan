import { configureStore } from '@reduxjs/toolkit'
import userDataSlicer from'./userDataSlicer'
import navBarWithSlicer from './navBarWithSlicer'

export default configureStore({
  reducer: {
    user:userDataSlicer,
    navbarWidth:navBarWithSlicer
  }
})