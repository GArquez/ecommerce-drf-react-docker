import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
    cart: [],
    totalQuantity: 0,
    total: 0,
    show: false
})

export function CartProvider({children}) {
    const [cart, setCart] = useState([])
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [total, setTotal] = useState(0)
    const [show, setShow] = useState(false)

    const getQuantity = () => {
        let accu = 0

        cart.forEach(prod => {
            accu += prod.quantity
        })

        return accu
    };

    const handleShow = () => {
        setShow(true)
    };

    const handleClose = () => {
        setShow(false)
    };

    useEffect(() => {
        const totalQty = getQuantity()
        setTotalQuantity(totalQty) 
    }, [cart]) 

    useEffect(() => {
        const total = getTotal()
        setTotal(total) 
    }, [cart]) 

    const isInTheCart = (id) => {
        return cart.some(product => product.id === id)
    };

    const addProduct = (productToAdd, quantity) => {
        if(isInTheCart(productToAdd.id) === false){
            productToAdd.quantity = quantity
            setCart ([...cart, productToAdd])
        } else {
            const itemToUpdate = cart.map( prod => {
                if(prod.id === productToAdd.id) {
                    const productUpdated = {
                        ...prod, quantity: quantity
                    }
                    return productUpdated
                } else {
                    return prod
                }
            })
            setCart(itemToUpdate)
        }
    };

    const getTotal = () => {
        let accu = 0

        cart.forEach(prod => {
            accu += prod.quantity * prod.price
        })
        return accu
    };

    const clearCart = () => {
        setCart([])
    };

    const getQuantityOfProduct = (id) => {
        const product = cart.find(prod => prod.id === id)

        return product?.quantity
    };

    const removeItem = (id) => {
        const cartWhithoutProduct = cart.filter( prod => prod.id !== id )
        setCart(cartWhithoutProduct)
    };

    return (
        <CartContext.Provider value={{show, cart, totalQuantity, total, handleShow, handleClose, removeItem, getQuantityOfProduct, clearCart, addProduct }}>
            {children}
        </CartContext.Provider>
    )
} 