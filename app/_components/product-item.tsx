"use client"

import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { ArrowDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProductItemProps {
    // product: Product,
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true,
                }
            }
        }
    }>
}

const ProductItem = ({product}: ProductItemProps) => {
    {/* 
     
    OBS: Se a sua página tiver interatividade, é necessário transformar em client component 
    
    Adicionar no inícip "use client"

        1 - Navegar para outra página com onClick

        const router = useRouter();

        2 - Adicionar na tag desejada

        onClick={() => router.push(`/products/${product.id}`)}
    */}

    return ( 
        <Link className="w-[150px] min-w-[150px]" href={`/products/${product.id}`}>
         <div className="space-y-2 w-full"> 
            {/*Imagem*/}
            <div className="h-[150px] w-full relative">
                <Image src={product.imageUrl} alt={product.name} fill className="object-cover rounded-lg shadow-md"/>
                {product.discountPercentage && (
                    <div className="absolute flex items-center gap-[2px] rounded-full left-2 top-2 px-2 py-[2x] bg-primary text-white">
                        <ArrowDownIcon size={12} />
                        <span className="text-ms font-semibold">{product.discountPercentage}%</span>
                    </div>
                )}
            </div>

               
            {/* Título, preço e restaurante*/}
            <div>
                <h2 className="text-sm truncate">{product.name}</h2>
                <div className="flex gap-1 items-center">
                    <h3 className="font-semibold">
                        {formatCurrency(calculateProductTotalPrice(product))}
                    </h3>
                   
                    {product.discountPercentage > 0 && (
                        <span className="text-muted-foreground line-through text-xs">{formatCurrency(Number(product.price))}
                        </span>
                    )}
                </div>
                <span className="text-xs text-muted-foreground block">{product.restaurant.name}</span>
            </div>
        </div>
       </Link>
    );
}
 
export default ProductItem;