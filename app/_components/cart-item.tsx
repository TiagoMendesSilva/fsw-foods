
import { CartContext, CartProduct } from "../_context/cart";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, Trash2Icon } from "lucide-react";
import { useContext } from "react";


interface CartItemProps {
    cartProduct: CartProduct
}

const CartItem = ({cartProduct}:CartItemProps) => {

    const { 
        decreaseProductQuantity, 
        increaseProductQuantity, 
        removeProductFromCart, 
        
    } = useContext(CartContext)

    const handleDecreaseQuantityClick = () => {
        decreaseProductQuantity(cartProduct.id)
    }

    const handleIncreaseQuantityClick = () => {
        increaseProductQuantity(cartProduct.id)
    }

    const handleRemoveClick = () => {
        removeProductFromCart(cartProduct.id)
    }

    return ( 
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                {/**Imagem e Info */}
                <div className="w-20 h-20 relative">
                    <Image src={cartProduct.imageUrl} alt={cartProduct.name} fill className="rounded-lg object-cover"/>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xs">{cartProduct.name}</h3>

                    <div className="flex items-center gap-1">
                        <h4 className="text-sm font-semibold">
                            {formatCurrency(calculateProductTotalPrice(cartProduct) * cartProduct.quantity)}
                        </h4>
                        {cartProduct.discountPercentage > 0 && (
                            <span className="text-xs font-semibold text-muted-foreground line-through">
                                {formatCurrency(Number(cartProduct.price) * cartProduct.quantity)}
                            </span>
                        )}
                    </div>
                     {/*Quantidade de produtos */}
                     <div className="flex items-center gap-2">
                        <Button className="bg-white text-black border hover:text-white w-[32px] h-[32px]" size="icon" >
                            <ChevronLeftIcon className="w-[18px]" onClick={handleDecreaseQuantityClick}/>
                        </Button>
                        <span className="w-4 text-center">{cartProduct.quantity}</span>
                        <Button size="icon" className="w-[32px] h-[32px]" >
                            <ChevronRightIcon className="w-[18px]" onClick={handleIncreaseQuantityClick}/>
                        </Button>
                    </div>

                </div>

            </div>
            <Button size="icon" className="bg-white text-black border w-[32px] h-[32px]">
                {/**Botão deletar */}
                <Trash2Icon className="w-[18px]" onClick={handleRemoveClick}/>
            </Button>
        </div>
     );
}
 
export default CartItem;