"use client"

import Cart from "@/app/_components/cart";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { Restaurant } from "@prisma/client";
import { useContext } from "react";

interface CartBannerProps {
    restaurant: Pick<Restaurant, 'id'>
}

const CartBanner = ({restaurant}: CartBannerProps) => {

    const {products, totalPrice, totalQuantify} = useContext(CartContext)

    const restaurantHasProductOnCart = products.some((product) => product.restaurantId === restaurant.id)

    
    if(!restaurantHasProductOnCart) return null

    return (  
        <div className="fixed bottom-0 left-0 z-50 w-full bg-white p-5 pt-3 border-t border-solid border-muted shadow-md">
            <div className="flex justify-between items-center">
                {/* Preço */}
                <div>
                    <span className="text-xs text-muted-foreground">Total sem entrega</span>
                    <h3 className="font-semibold">
                        {formatCurrency(totalPrice)}{" "}
                        <span className="text-xs text-muted-foreground font-normal">
                            {" "} / {totalQuantify} {totalQuantify > 1 ? "itens" : "item"}
                        </span>
                    </h3>    
                </div>
                {/* Botão */}
                <Sheet>
                    <SheetTrigger>
                        <Button> Ver sacola </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle className="text-left">Sacola</SheetTitle>
                        </SheetHeader>
                        <Cart />
                    </SheetContent>
                </Sheet>

            </div>

        </div>
    );
}
 
export default CartBanner;