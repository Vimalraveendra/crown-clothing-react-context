
import React, {createContext,useState,useEffect} from 'react'

import {addItemToCart,removeItemFromCart,filterItemsFromCart,getCartItemsCount,getCartTotal} from "./cart.utils"

export const CartContext = createContext({
    hidden:true,
    toggle:()=>{},
    cartItems:[],
    addItem:()=>{},
    removeItem:()=>{},
    clearItemFromCart:()=>{},
    cartItemsCount:0,
    cartTotal:0
})

// here we are wrapping the actual application inside the 
// CartProvider & passing the CartContext value to its
// children, its very similar to we are wrapping our entire
// app inside the Provider component from "react-redux" & passing
// the store in the index.js.so that store is available to its child component.

// we created a CartProvider component that has this local state
// value & local state functions that  allows us to update the values
// values in the CartContext using the those set functions

// now we have this local state value & localState functions. then we
//are going to wrap the actual application using the cartContext dot
// provider so that all the values pass in as a object is available
// to all other components nested inside our actual application
// using the CartContext consumer or useContext(CartContext)

const CartProvider =({children})=>{
    const[hidden,setHidden]=useState(true)
    const toggleHidden=()=>setHidden(!hidden)
    const [cartItems,setCartItems] = useState([])
    const addItem= item=>setCartItems(addItemToCart(cartItems,item))
    const removeItem= item=>setCartItems(removeItemFromCart(cartItems,item))
    const clearItemFromCart= item=>setCartItems(filterItemsFromCart(cartItems,item))
    const [cartItemsCount,setCartItemsCount] = useState(0)
    const[cartTotal,setCartTotal] = useState(0)

    useEffect(() => {
      setCartItemsCount(getCartItemsCount(cartItems))
      setCartTotal(getCartTotal(cartItems))
        
    }, [cartItems])
    return(
        <CartContext.Provider  
        value={{hidden,toggleHidden,cartItems,addItem, removeItem ,clearItemFromCart,cartItemsCount,cartTotal }}>
        {children}
        </CartContext.Provider>
    )
}

export default CartProvider;    