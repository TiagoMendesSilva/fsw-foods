import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";


export default async function Home() {

  const products =  await db.product.findMany({
    where: {
        discountPercentage: {
            gt:0
        }
    },
    take: 10,
    include: {
        restaurant: {
            select: {
                name: true,
            }
        }
    },
    
});

  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>
      <div className="px-5 pt-6">
        <PromoBanner 
          src="/banner-pizza.png" 
          alt="Até 30% de desconto em pizzas!" 
        />
      </div>
      <div className="pt-6 space-y-4">
        <div className="px-5 flex justify-between items-center">
          <h2 className="font-semibold">Pedidos recomendados</h2>
          <Link href={`/products/recommended`}>
            <Button variant="ghost" className="p-0 text-primary hover:bg-transparent h-fit">
              ver todos
              <ChevronRightIcon size={16}/>
            </Button>
          </Link>          
        </div>
        <ProductList products={products}/>
      </div>

      <div className="px-5 pt-6">
        <PromoBanner 
          src="/banner-burguer.png" 
          alt="A partir de R$17,90 em lanches!" 
        />
      </div>

      <div className="pt-6 space-y-6">
        <div className="px-5 flex justify-between items-center">
          <h2 className="font-semibold">Restaurantes recomendados</h2>
          <Link href={`/restaurants/recommended`}>
            <Button variant="ghost" className="p-0 text-primary hover:bg-transparent h-fit">
              ver todos
              <ChevronRightIcon size={16}/>
            </Button>
          </Link>          
        </div>
        <RestaurantList />
      </div>

      


    </>
  );
}
