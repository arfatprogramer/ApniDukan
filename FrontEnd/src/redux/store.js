import { configureStore } from '@reduxjs/toolkit'
import userSlicer from './userSlicer'
import addressSlicer from './addressSlicer'
import confirmAddressSlicer from './confirmAddressSlicer'
import confirmProduct  from './confirmProducts'
import conformAmount from './finalAmount'
import customerOrderData from "./customerOrderData";
import buyProductSlicer from "./buyProductSlicer";
import  tokenSlicer  from './tokenSlicer'
import  cartItemCount from './cartItemCount'


export default configureStore({
  reducer: {
    user:userSlicer,
    address:addressSlicer,
    confirmAddressSlicer:confirmAddressSlicer,
    confirmProduct:confirmProduct,
    conformAmount:conformAmount,
    MyOrder:customerOrderData,
    buyProduct:buyProductSlicer,
    token:tokenSlicer,
    cart:cartItemCount
  }
})