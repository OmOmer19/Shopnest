import { createContext,useContext, useEffect, useState } from "react";

//creating context
const cartContext = createContext()

// provider component
export const CartProvider = ({children}) =>{
    const [cartItems,setCartItems] = useState([])

    // loading cart from local load
    useEffect(() =>{
        const storedCart = localStorage.getItem("shopnest_cart")
        if(storedCart){
            setCartItems(JSON.parse(storedCart))
        }
    },[])

    //saving to local storage whenever it changes
    useEffect(() =>{
        localStorage.setItem("shopnest_cart",JSON.stringify(cartItems))
    },[cartItems])

    // to add to cart
    const addToCart = (product) =>{
        setCartItems((prev) => {
            const existing = prev.find((item) => item._id === product._id)
            if(existing){
                //increasing quantity if already
                return prev.map((item) => item._id === product._id ? {...item, quantity: item.quantity+1}
                     : item)
            }
            // adding new product
            return [...prev,{...product,quantity:1}]
        })
    }

// to remove from cart
const removeFromCart = (id) =>{
    setCartItems((prev) => prev.filter((item) => item._id !== id))
}

// to clear cart
const clearCart =() =>{
    setCartItems([])
}

// to increase quantity 
const increaseQty = (id) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

// to decrease quantity
const decreaseQty = (id) => {
  setCartItems((prev) =>
    prev
      .map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  )
}

return(
    <cartContext.Provider value={{cartItems,addToCart,removeFromCart,clearCart
                                  ,increaseQty, decreaseQty}}>
        {children}
    </cartContext.Provider>
)
}

// custom hook for easy use
export const useCart = () => useContext(cartContext)