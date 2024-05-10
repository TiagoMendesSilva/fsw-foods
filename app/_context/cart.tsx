"use client"

import { Prisma, Product } from "@prisma/client"
import { ReactNode, createContext, useMemo, useState } from "react"
import { calculateProductTotalPrice } from "../_helpers/price"

interface ICartContext {
    products: CartProduct[],
    subTotalPrice: number,
    totalPrice: number,
    totalDiscounts: number,
    addProductToCart: (product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    deliveryFee: true,
                }
            }
        }
        }>, quantity: number) => void
    decreaseProductQuantity: (productId: string) => void
    increaseProductQuantity: (productId: string) => void
    removeProductFromCart: (productId: string) => void
}

export interface CartProduct extends Prisma.ProductGetPayload<{
    include: {
        restaurant: {
            select: {
                deliveryFee: true
            }
        }
    }
}> {
    quantity: number,

}

export const CartContext = createContext<ICartContext>({
    products: [],
    subTotalPrice: 0,
    totalPrice: 0,
    totalDiscounts: 0,
    addProductToCart: () => {},
    decreaseProductQuantity: () => {},
    increaseProductQuantity:() => {},
    removeProductFromCart:() => {}
    
})

export const CartProvider = ( {children}: {children : ReactNode} ) => {

    const [ products, setProducts ] = useState<CartProduct[]>([]);

    const subTotalPrice = useMemo(() => {
        return products.reduce((accumulator, product) => {
            return accumulator + Number(product.price) * product.quantity
        }, 0)
    }, [products])

    const totalPrice = useMemo(() => {
        return products.reduce((accumulator, product) => {
            return accumulator + calculateProductTotalPrice(product) * product.quantity;
        }, 0 )
    }, [products])

    const totalDiscounts = subTotalPrice - totalPrice


    const addProductToCart = (product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    deliveryFee: true,
                }
            }
        }
        }>, 
        quantity: number) => {

        //Verificar se o produto já está no carrinho
        const isProductAlreadyOnCart = products.some(cartProduct => cartProduct.id === product.id)
        
        //Se o produto estiver no carrinho, aumentar sua quantidade
        if(isProductAlreadyOnCart) {
            return setProducts((prev) => 
                prev.map((cartProduct) => {
                    if(cartProduct.id === product.id) {
                        
                        return {
                            ...cartProduct,
                            quantity: cartProduct.quantity + quantity
                        }
                    }
                    return cartProduct
                })

            )
        }
        
        //Se o produto não estiver no carrinho, adicioná-lo com a quantidade recebida

        setProducts((prev) => [...prev, { ...product, quantity: quantity }])
       
    }

    const decreaseProductQuantity = (productId: string) => {

        return setProducts((prev) => 
            prev.map((cartProduct) => {
                if(cartProduct.id === productId) {
                    if(cartProduct.quantity === 1 ){
                        return cartProduct        
                    }
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity -1,
                    }
                    
                }
                return cartProduct
            })
        )

    }

    const increaseProductQuantity = (productId: string) => {

        return setProducts((prev) => 
            prev.map((cartProduct) => {
                if(cartProduct.id === productId) {
                   
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + 1,
                    }
                    
                }
                return cartProduct
            })
        )

    }


    const removeProductFromCart = (productId: string) => {
        return setProducts((prev) => prev.filter((product) => product.id !== productId))
    }


    return(
        <CartContext.Provider value={{ 
            products,
            subTotalPrice,
            totalPrice,
            totalDiscounts, 
            addProductToCart, 
            decreaseProductQuantity, 
            increaseProductQuantity, 
            removeProductFromCart 
            }}>
            {children}
        </CartContext.Provider>
    )
}