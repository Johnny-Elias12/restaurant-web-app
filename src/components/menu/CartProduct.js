import { cartProductPrice } from "@/components/AppContext";
import Remove from "../icons/Remove";
import Image from "next/image";

export default function CartProduct({product, onRemove}) {
    return(
        <div key={product._id} className="flex items-center gap-4 border-b py-4">
            <div className="w-24">
                <Image src={"/pizza pic.png"}  //src={product.image}
                    alt="name" 
                    width={240} 
                    height={240}  />
            </div>
            <div className="grow">
                <h3 className="font-semibold">
                    {product.name}
                </h3>
                {product.size && (
                    <div className="text-sm">
                        Size: <span>{product.size.name}</span>
                    </div>
                )}
                {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-600">
                        {product.extras.map(extra => (
                            <div key={extra._id}>{extra.name} {extra.price}$</div>
                        ))}
                    </div>
                )}
            </div>
            <div className="text-lg font-semibold">
                {cartProductPrice(product)}$
            </div>
            {!!onRemove && (
                <div className="ml-2">
                    <button 
                        className="p-2"
                        type="button"
                        onClick={() => onRemove(product._id)}
                    > 
                        <Remove /> 
                    </button>
                </div>
            )}
        </div>
    );
}