"use client"


import { Avatar, AvatarFallback, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { CartContext } from "@/app/_context/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRightIcon, Divide } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

interface OrdemItemProps {
    order: Prisma.OrderGetPayload<{
        include: {
            restaurant: true,
            products: {
                include: {
                    product: true
                }
            }
        }
    }>
}

const getOrderStatusLabel = (status: OrderStatus) => {
    switch(status) {
        case "CONFIRMED":
            return "Confirmado"
        case "PREPARING":
            return "Preparando"
        case "CANCELED":
            return "Cancelado"
        case "DELIVERING":
            return "Em transporte"
        case "COMPLETED":
            return "Finalizado"
    }
}

const OrderItem = ({order}:OrdemItemProps) => {

    const { addProductToCart } =  useContext(CartContext);

    const router = useRouter();

    const handleRedoOrderClick = () => {
        for( const orderProduct of order.products) {
            addProductToCart({
                product: {...orderProduct.product, restaurant: order.restaurant},
                quantity: orderProduct.quantity,
            })
        }

        router.push(`/restaurants/${order.restaurantId}`)
    }

    return ( 
        <Card>
            <CardContent className="py-5">
                <div className={`bg-[#EEEEEE] text-muted-foreground rounded-full w-fit px-2 py-1 ${order.status !== "COMPLETED" && "bg-green-500 text-white"}`}>
                    <span className="block text-xs font-semibold">{getOrderStatusLabel(order.status)}</span>
                </div>

                <div className="flex justify-between items-center py-3">
                    <div className="flex items-center gap-2">
                         <Avatar className="w-6 h-6">
                            <AvatarImage src={order.restaurant.imageUrl} />
                        </Avatar>
                        <span className="font-semibold text-sm">
                            {order.restaurant.name}
                        </span>
                    </div>


                    <Button variant="ghost" size="icon" className="w-5 h-5" asChild>
                        <Link href={`/restaurants/${order.restaurantId}`}>
                            <ChevronRightIcon /> 
                        </Link>
                    </Button>
                </div>


                <div className="py-3">
                        <Separator />
                </div>

                <div className="space-y-2">
                    {order.products.map(product => (
                        <div key={product.id} className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-muted-foreground flex justify-center items-center">
                               <span className="block text-xs text-white"> {product.quantity}</span>
                            </div>
                            <span className=" block text-xs text-muted-foreground">{product.product.name}</span>
                        </div>
                    ))}
                </div>

                <div className="py-3">
                    <Separator />
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-sm">{formatCurrency(Number(order.totalPrice))}</p>
                    <Button 
                        variant="ghost" 
                        className="text-primary text-xs" 
                        size="sm" 
                        disabled={order.status !== "COMPLETED"}
                        onClick={handleRedoOrderClick}
                    >
                        Refazer pedido
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
 
export default OrderItem;