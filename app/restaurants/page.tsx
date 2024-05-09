"use client"

import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurant } from "./_actions/search";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";

const Restaurants = () => {

    const searchParams = useSearchParams();

    const [restaurants, setRestaurants] = useState<Restaurant[]>([])

    const searchFor = searchParams.get("search");

    useEffect(() => {

        const fetchRestaurants = async () => {
            if(!searchFor) return
            const foundRestaurants =  await searchForRestaurant(searchFor);
            setRestaurants(foundRestaurants)
        }

        fetchRestaurants();

    }, [searchFor]);

    

    if(!searchFor) {
        return notFound()
    }

    return (
        <>
        <Header />
        <div className="py-6 px-5">
        <h2 className="text-lg font-semibold mb-6">Restaurantes encontrados</h2>
        <div className="flex flex-col w-full gap-6">
            {restaurants.map((restaurant) => (
                <RestaurantItem key={restaurant.id} restaurant={restaurant} className="min-w-full max-w-full" />
            ))}
        </div>        
       </div>
       </>
    )
}
 
export default Restaurants;