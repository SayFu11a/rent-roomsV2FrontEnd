import React from "react";
import AppContext from '../context'

export const useCart = () => {
   const { cartItem, setCartItem } = React.useContext(AppContext)

   const priceSum = cartItem.reduce((sum, obj) => sum + obj.price, 0)

   return {
      setCartItem,
      cartItem,
      priceSum
   }
}


