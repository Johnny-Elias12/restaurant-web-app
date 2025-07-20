import Remove from "@/components/icons/Remove";
import { useState } from "react";

export default function DeleteButton({label, onDelete}){
    
    const [showConfirm, setShowConfirm] = useState(false)

    if (showConfirm){
        return (
            <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center">
                <div className="bg-white p-4 rounded-lg">
                    <div className="text-gray-600 text-sm">Are you sure?</div>
                    <div className="flex gap-2 mt-1">
                        <button 
                            type="button"
                            onClick={()=>setShowConfirm(false)}
                        >
                            Cancel
                        </button>
                        
                        <button 
                            type="button" 
                            className="primary"
                            onClick={() => {
                                onDelete();
                                setShowConfirm(false);
                            }}
                        >
                            <Remove />
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    
    return(
        <button type="button" onClick={() => setShowConfirm(true)}>
            <Remove />
            {label}
        </button>
    );
}