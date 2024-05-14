import { useContext, useState } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { createOrder } from "../_actions/order";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

const Cart = () => {

    {/*Loading*/} 
    const [ isSubmitLoading, setIsSubmitLoading ] = useState(false)
     {/*Alerta de confirmação*/} 
     const [ isConfirmationDialogOpen, setIsConfirmationDialogOpen ] = useState(false)
    

    const { data } = useSession();

    const { 
        products,
        subTotalPrice, 
        totalPrice, 
        totalDiscounts,
        clearCart 
    } = useContext(CartContext);

    const handleFinishOrderClick = async () => {

        if(!data?.user) return;

        const restaurant = products[0].restaurant

       try {

        setIsSubmitLoading(true)

        await createOrder({
            subTotalPrice,
            totalDiscounts,
            totalPrice,
            deliveryFee: restaurant.deliveryFee,
            deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
            restaurant: {
                connect: { id: restaurant.id }
            },
            status: OrderStatus.CONFIRMED,
            user: {
                connect: {id: data.user.id}
            }
        })

        clearCart()

       } catch (error) {
            console.log(error)
       } finally {
        setIsSubmitLoading(false)

       }

        
    }

    
    return (
        <>
            <div className=" flex h-full flex-col py-5">
            

            {products.length > 0 ? (
                <>
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
                    <Button className="w-full mt-6" onClick={() => setIsConfirmationDialogOpen(true)} disabled={isSubmitLoading}>
                                                
                        Finalizar pedido
                    </Button>
                </div>
                </>
                ) : (
                    <h2 className="font-medium text-left">Sua sacola está vazia.</h2>
                )}

            </div>

            <AlertDialog open={isConfirmationDialogOpen} onOpenChange={setIsConfirmationDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Ao finalizar seu pedido, você concorda com os termos e conições da nossa plataforma.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel disabled={isConfirmationDialogOpen}>
                        {isSubmitLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleFinishOrderClick}>Finalizar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>


        
        </>
    );
}
 
export default Cart;