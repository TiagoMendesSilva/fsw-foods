"use client"


import DeliveryInfo from "@/app/_components/delivery-info";
import DiscountBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";

import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { calculateProductTotalPrice, formatCurrency } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { BikeIcon, ChevronLeftIcon, ChevronRightIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: true,
        }
    }>;
    complementaryProducts: Prisma.ProductGetPayload<{
        include: {
            restaurant: true,
        };
    }>[];
   
}


const ProductDetails = ({ product, complementaryProducts }:ProductDetailsProps) => {

    const [quantify, setQuantify] = useState(1);

    // const handleIncreaseQuantifyClick = () => setQuantify(quantify + 1);
    const handleIncreaseQuantifyClick = () => setQuantify(currencyState => currencyState + 1);

    // const handleDecreaseQuantifyClick = () => setQuantify( quantify - 1);
    const handleDecreaseQuantifyClick = () => setQuantify(currencyState => {

        if(currencyState === 1) return 1
        return  currencyState - 1;
    });

    
    return ( 
        <div className="py-5 bg-white rounded-tl-3xl rounded-tr-3xl relative z-50 mt-[-1.5rem]">

            {/* Restaurante */}
            <div className="flex items-center gap-[0.375rem] px-5">
                <div className="relative h-6 w-6">
                    <Image 
                        src={product.restaurant.imageUrl} 
                        alt={product.restaurant.name} 
                        fill 
                        className="rounded-full object-cover"
                    />
                </div>
                <span className="text-xs text-muted-foreground">{product.restaurant.name}</span>

            </div>

            {/* Nome do Produto */}
            <h1 className="text-xl font-semibold mb-3 m-1 px-5">{product.name}</h1>
            
            
            {/* Preço e Quantidade do Produto */}
            <div className="flex justify-between px-5">
                {/*Preço com desconto*/}
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold">{formatCurrency(calculateProductTotalPrice(product))}</h2>
                        {product.discountPercentage > 0 && (
                            <DiscountBadge product={product} />
                        )}
                    </div>
                    {/*Preço original*/}
                    {product.discountPercentage > 0 && (
                        <p className="text-sm text-muted-foreground"> De: {formatCurrency((Number(product.price)))}</p>
                    )}
                        
                    
                </div>

                {/*Quantidade de produtos */}
                <div className="flex items-center gap-2">
                    <Button className="bg-white text-black border hover:text-white" size="icon" onClick={handleDecreaseQuantifyClick}>
                        <ChevronLeftIcon />
                    </Button>
                    <span className="w-4 text-center">{quantify}</span>
                    <Button size="icon" onClick={handleIncreaseQuantifyClick}>
                        <ChevronRightIcon />
                    </Button>
                </div>


            </div>

            {/* Dados da entrega */}
            <div className="px-5">
                <DeliveryInfo restaurant={product.restaurant}/>
            </div>

            <div className="mt-6 space-y-3 px-5">
                <h3 className="font-semibold">Sobre</h3>
                <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>

            <div className="mt-6 space-y-3">
                <h3 className="font-semibold px-5">Sucos</h3>
                <ProductList products={complementaryProducts}/>
            </div>

            <div className="mt-6 px-5">
                <Button className="w-full font-semibold"> Adicionar à sacola</Button>
            </div>

        </div>
     );
}
 
export default ProductDetails;