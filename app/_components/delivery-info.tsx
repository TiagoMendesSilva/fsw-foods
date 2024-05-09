import { BikeIcon, TimerIcon } from "lucide-react";
import { Card } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Restaurant } from "@prisma/client";


interface DeliveryInfoProps {
    restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTimeMinutes">
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
    return (  

       
        <>
            <Card className="flex justify-around py-3 mt-6">
                {/* Custo */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center text-muted-foreground gap-1">
                        <span className="text-xs">Entrega</span>
                        <BikeIcon size={16}/>
                    </div>
                    {Number(restaurant.deliveryFee) > 0 ? (
                        <p className="text-xs font-semibold">
                            {formatCurrency(Number(restaurant.deliveryFee))}
                        </p>
                    ) : (
                        <p className="text-xs font-semibold">
                            Grátis
                        </p>
                    )
                    }
                </div>

                {/* Tempo */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center text-muted-foreground gap-1">
                        <span className="text-xs">Tempo</span>
                        <TimerIcon size={16}/>
                    </div>
                    <p className="text-xs font-semibold">
                        {restaurant.deliveryTimeMinutes} min
                    </p>
                </div>
            </Card>

          
        </>
    );
}
 
export default DeliveryInfo;