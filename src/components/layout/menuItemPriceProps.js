import Remove from "@/components/icons/Remove"
import Plus from "@/components/icons/Plus"
import ChevronDown from "@/components/icons/ChevronDown"
import ChevronUp from "@/components/icons/ChevronUp"
import { useState } from "react"


export default function MenuItemPriceProps({name, addLabel, placeholder, props, setProps}) {


    const [isOpen, setIsOpen] = useState(false);

    function addProps(){
        setProps(oldProps => {
            return [...oldProps, {name:'', price:0}];
        });
    }

    function editProps(ev, index, prop){
        const newValue = ev.target.value;
        setProps(prevSizes => {
            const newSizes= [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
        })
    }

    function  removeProps(indexToRemove){
        setProps(prev => prev.filter((v, index) => index !== indexToRemove));
    }
    
    
    return (
        <div className="bg-gray-200 p-2 rounded-md mb-2">
            <button 
                className="inline-flex p-1 border-0 justify-start"
                type="button"
                onClick={() => setIsOpen(prev => !prev)}
            >
                {isOpen && (
                    <ChevronUp />
                )}
                {!isOpen && (
                    <ChevronDown />
                )}
                <span>{name}</span>
                <span>({props?.length})</span>
            </button>

            <div className={isOpen ? 'block' : 'hidden'}>
                {props?.length > 0 && props.map((size, index) => (
                    <div className="flex gap-2" key={index}>
                        <div>
                            <label>Name</label>
                            <input 
                                type = "text" 
                                placeholder = {placeholder}
                                value={size.name}
                                onChange={ev => editProps(ev, index, 'name')}
                            />
                        </div>
                        <div>
                            <label>Extra price</label>
                            <input 
                                type="text" 
                                placeholder="Extra price" 
                                value={size.price}
                                onChange={ev => editProps(ev, index, 'price')}/>
                        </div>
                        <div>
                            <button 
                                type="button"
                                onClick={() => removeProps(index)}
                                className="bg-white mt-5 px-2"
                                >
                                <Remove />
                            </button>
                        </div>
                    </div>
                ))}
                <button 
                    type="button"
                    onClick={addProps}
                    className="bg-white items-center">
                        <Plus className="h-4 w-4"/>
                        {addLabel}
                </button>
    
            </div>
        </div>
    ); 
}