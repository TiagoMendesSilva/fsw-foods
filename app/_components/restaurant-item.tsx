import { Restaurant } from "@prisma/client";
import { BikeIcon, ClockIcon, HeartIcon, StarIcon } from "lucide-react";

import Image from "next/image";
import { format } from "path";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";

interface RestaurantItemProps {
    restaurant: Restaurant
}


const RestaurantItem = ({restaurant}: RestaurantItemProps) => {
    return ( 
        <div className="min-w-[266px] max-w-[266px] space-y-3">
            
            {/*Imagem */}
            <div className="w-full h-[136px] relative">
                <Image
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    fill
                    className="object-cover rounded-lg"    
                />

                <div className="absolute flex items-center gap-[2px] rounded-full left-2 top-2 px-2 py-[2x] bg-white">
                    <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold">5.0</span>
                </div>

                <Button size="icon" className="absolute right-2 top-2 bg-gray-700 rounded-full h-7 w-7">
                    <HeartIcon size={16} className="fill-white" />
                </Button>
            </div>

            {/*Texto */}
            <div>
                <h3 className="font-semibold text-sm">{restaurant.name}</h3>
                {/*informações da entrega */}
                <div className="flex gap-3">
                    {/*Custo de entrega */}
                    <div className="flex items-center gap-1">
                        <BikeIcon className="text-primary"  size={14} />
                        <span className="text-xs text-muted-foreground">
                            {Number(restaurant.deliveryFee) === 0 ? "Entrega grátis" : formatCurrency(Number(restaurant.deliveryFee))}
                        </span>
                        
                    </div>
                    {/*Tempo de entrega */}
                    <div className="flex items-center gap-1">
                        <ClockIcon className="text-primary"  size={14} />
                        <span className="text-xs text-muted-foreground">
                            {restaurant.deliveryTimeMinutes} min
                        </span>
                        
                    </div>
                </div>
            </div>

        </div>
     );
}
 
export default RestaurantItem;