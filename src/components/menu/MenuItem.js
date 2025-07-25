import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import FlyingButton from 'react-flying-item';
import MenuItemTile from "@/components/menu/MenuItemTile"
import Image from "next/image";

export default function MenuItem({
  image,
  name,
  description,
  basePrice,
  sizes,
  extraIngredientPrices,
  ...menuItem
}){
    
    const [
        selectedSize, setSelectedSize
    ] = useState(sizes?.[0] || null);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedExtras, setSelectedExtras] = useState([])
    const {addToCart} = useContext(CartContext);
    
    async function handleAddToCartButtonClick() {
        const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
        if (hasOptions && !showPopup) {
            setShowPopup(true);
            return;
        }
        addToCart({
            ...menuItem,
            name,
            image,
            description,
            basePrice,
            }, selectedSize, selectedExtras);

        await new Promise(resolve => setTimeout(resolve, 1000));
        setShowPopup(false);
  }

    function handleExtraThingClick(ev, extraThing) {
        const checked = ev.target.checked;
        if (checked) {
            setSelectedExtras(prev => [...prev, extraThing])
        } else {
            setSelectedExtras(prev => {
               return prev.filter(e => e.name !== extraThing.name);
            })
        }
    }

    let selectedPrice = basePrice;
    if (selectedSize) {
        selectedPrice += selectedSize.price;
    }
    if(selectedExtras?.length > 0) {
        for(const extra of selectedExtras) {
            selectedPrice += extra.price;
        }
    }


    return(
        <> 
            {showPopup && (
                <div 
                    onClick={() => setShowPopup(false)}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center">
                    <div 
                        onClick={ev => ev.stopPropagation()}
                        className="my-8 bg-white p-2 rounded-lg max-w-md">
                        <div 
                            className="overflow-y-scroll p-2" 
                            style={{maxHeight: 'calc(100vh - 100px'}}
                        >
                            <Image 
                                src={"/pizza pic.png"} 
                                alt="name" 
                                width={300} 
                                height={200} 
                                className="mx-auto"
                            />
                            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                            <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
                            {sizes?.length > 0 && (
                                <div className="p-2">
                                    <h3 className="text-center text-gray-700">Pick your size</h3>
                                    {sizes.map(size => (
                                        <label 
                                            className="flex items-center gap-2 p-4 border rounded-md mb-1 bg-gray-200"
                                            key={size.name}
                                            >
                                            
                                            <input 
                                                type="radio" 
                                                onChange={() => setSelectedSize(size)}
                                                checked={selectedSize?.name === size.name}
                                                name={size}
                                                /> 
                                            {size.name} ${basePrice + size.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            {extraIngredientPrices?.length>0 && (
                                <div className="p-2">
                                    <h3 className="text-center text-gray-700">Any extras?</h3>
                                    
                                    {extraIngredientPrices.map(extra => (
                                        <label 
                                            className="flex items-center gap-2 p-4 border rounded-md mb-1 bg-gray-200"
                                            key={extra.name}
                                        >
                                            <input 
                                                type="checkbox" 
                                                onChange={ev => handleExtraThingClick(ev, extra)}
                                                checked={selectedExtras.map(e => e._id).includes(extra._id)}
                                                name={extra.name}/> 
                                            {extra.name} ${extra.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            <FlyingButton
                                targetTop={'5%'}
                                targetLeft={'95%'}
                                src={"/pizza pic.png"}
                            >
                                <div 
                                    className="primary sticky bottom-2"
                                    onClick={handleAddToCartButtonClick}
                                >
                                    Add to cart {selectedPrice}$
                                </div>
                            </FlyingButton>
                            
                            
                            <button
                                className="mt-2"
                                onClick={() => setShowPopup(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}   
            <MenuItemTile 
                onAddToCart={handleAddToCartButtonClick}
                image={image}
                name={name}
                description={description}
                basePrice={basePrice}
                sizes={sizes}
                extraIngredientPrices={extraIngredientPrices}
                {...menuItem}
            />
        </>
    );
}