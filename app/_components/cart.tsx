import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
    const { 
        products,
        subTotalPrice, 
        totalPrice, 
        totalDiscounts 
    } = useContext(CartContext);

    
    return (
        <div className=" flex h-full flex-col py-5">
            <div className="flex-auto space-y-2">
                {products.map((product) => (
                    <CartItem key={product.id} cartProduct={product} />
                ))}
            </div>

            {/*Card com todos os valores */}
            <div className="mt-6">
                <Card>
                    <CardContent className="p-5 space-y-4">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-muted-foreground">Subtotal</span> 
                            <span>{formatCurrency(subTotalPrice)}</span> 
                        </div> 
                        <Separator />
                        <div className="flex justify-between items-center text-xs">
                            <span>Entrega</span> 
                            {Number(products?.[0].restaurant.deliveryFee) === 0 
                            ? <span className="uppercase text-primary">GRÁTIS</span> 
                            : formatCurrency(Number(products?.[0].restaurant.deliveryFee))}
                             
                        </div>  
                        <Separator/>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-muted-foreground">Descontos</span> 
                            <span>- {formatCurrency(totalDiscounts)}</span> 
                        </div> 
                        <Separator/>
                         <div className="flex justify-between items-center text-xs font-semibold">
                            <span>Total</span> 
                            <span>{formatCurrency(totalPrice)}</span> 
                        </div>   
                    </CardContent>
                </Card>
            </div>

            {/*Card para finalizar pedido */}
            <div>
                <Button className="w-full mt-6">
                    Finalizar pedido
                </Button>
            </div>

        </div>
    );
}
 
export default Cart;