import FlyingButton from 'react-flying-item';

export default function AddToCartButton (
    {hasSizesOrExtras, onClick, basePrice, image}
) {
    if (!hasSizesOrExtras) {
        return (
            <div className='flying-button-parent'>
                <FlyingButton 
                targetTop={'5%'}
                targetLeft={'95%'}
                src="/pizza pic.png"
            >
                <div onClick={onClick}>
                    Add to cart {basePrice}$
                </div>
                
            </FlyingButton> 
            </div>
            
        )
    }
    return(
        <button 
            type="button"
            onClick={onClick}
            className="mt-4 bg-primary text-white rounded-full px-8 py-2"

        >
            <span>Add to cart (From {basePrice}$)</span>   
        </button>
    );
}