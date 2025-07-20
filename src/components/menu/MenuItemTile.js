import AddToCartButton from '@/components/menu/AddToCartButton'

export default function MenuItemTile({onAddToCart, ...item}) {
    const {image, description, name, basePrice, sizes, extraIngredientPrices} = item;
    const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length >0;
    return(
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all flex flex-col h-full">
                <img src="/pizza pic.png" alt="pizza" />
                {/* <img src={image} alt="pizza" />  */}
                <h4 className="font-semibold my-3 text-xl">{name}</h4>
                <p className="text-gray-500 text-sm line-clamp-3 flex-grow">{description}</p>
                <div className="mt-auto">
                    <AddToCartButton
                    hasSizesOrExtras={hasSizesOrExtras}
                    basePrice={basePrice}
                    onClick={onAddToCart}
                    />
                </div>
            </div>
    );
}
