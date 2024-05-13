import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import CartBanner from "./_components/cart-banner";

interface RestaurantPageProps {
    params: {
        id: string
    }
}

const RestaurantPage = async ({ params:{ id } }: RestaurantPageProps) => {

    const restaurant = await db.restaurant.findUnique({
        where: {
            id 
        },
        include: {
            categories:{ 
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    products: {
                        where: {
                            restaurantId: id,
                        },
                        include: {
                            restaurant: {
                                select: {
                                    name: true,
                                }
                            }
                        }
                    }
                }
            },
            products: {
                take: 10,
                include: {
                    restaurant: {
                        select: {
                            name: true,
                        }
                    }
                }
            }
        }
    })


    if(!restaurant) return notFound()

    return (  
        <div>
            {/* Imagem */}
            <RestaurantImage restaurant={restaurant}/>

            <div className="flex items-center justify-between px-5 pt-5 bg-white rounded-tl-3xl rounded-tr-3xl relative z-50 mt-[-1.5rem]">
                {/* Título */}
                <div className="flex items-center gap-[0.375rem]">
                     {/* Título */}
                    <div className="relative h-8 w-8">
                        <Image 
                            src={restaurant.imageUrl} 
                            alt={restaurant.name} 
                            fill 
                            className="rounded-full object-cover"
                        />
                    </div>
                    <h1 className="text-xl font-semibold">{restaurant.name}</h1>
                </div>

                <div className="flex items-center gap-[3px] rounded-full  px-2 py-[2x] bg-foreground">
                    <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold text-white">5.0</span>
                </div>
               
            </div>

            <div className="px-5">
                <DeliveryInfo restaurant={restaurant}/>
            </div>

            <div className="flex overflow-x-scroll gap-4 [&::-webkit-scrollbar]:hidden mt-3 px-5">
                {restaurant.categories.map((category) => (
                    <div key={category.id} className="bg-[#F4F4F4] min-w-[167px] rounded-lg text-center ">
                        <span className="text-muted-foreground text-xs">{category.name}</span>
                    </div>
                ))}
            </div> 

            <div className="px-5 mt-6 space-y-4">
                {/* TODO - mostrar produtos mais pedidos quando implementarmos realização de pedidos */}
                <h2 className="font-semibold">Mais pedidos</h2>
                <ProductList products={restaurant.products}/>
            </div>

            {restaurant.categories.map((category) => (
                <div className="px-5 mt-6 space-y-4" key={category.id}>
               
                    <h2 className=" px-5 font-semibold">{category.name}</h2>
                    <ProductList products={category.products}/>
                </div>
            ))}

            

           <CartBanner  restaurant={restaurant}/>
        </div>
    );
}
 
export default RestaurantPage;