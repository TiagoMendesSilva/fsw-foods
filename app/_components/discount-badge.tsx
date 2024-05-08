import { Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";

interface DiscountBadgeProps {
    product: Pick<Product, 'discountPercentage'>
}

const DiscountBadge = ({ product }: DiscountBadgeProps) => {

    return (
        <div className="flex items-center gap-[2px] rounded-full  px-2 py-[2x] bg-primary text-white">
            <ArrowDownIcon size={12} />
            <span className="text-ms font-semibold">{product.discountPercentage}%</span>
        </div>
    )
}

export default DiscountBadge; 