'use client';
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Image from "next/image";
import Link from "next/link";
import Plus from "@/components/icons/Plus";
import { useEffect, useState } from "react";


export default function MenuItemsPage(){
    
    const [menuItems, setMenuItems] = useState([]);
    const {loading, data} = useProfile();
    
    
    useEffect(()=> {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems);
            });
        });
    }, [])


    if (loading){
        return 'Loading user info...'
    }
    if(!data.admin){
        return 'not an admin.'
    }
    
    
    return(
        <section className="mt-8 max-w-xl mx-auto">
            <UserTabs isAdmin={true}/>
            <div className="mt-8">
                <Link 
                    className="button"
                    href={'/menu-items/new'}
                >
                    <Plus />
                    Create a new item
                </Link>
            </div>
            <div>
            <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
                <div className="grid grid-cols-3 gap-2">
                    {menuItems?.length >0 && menuItems.map(item => (
                        <Link 
                            key={item._id} 
                            href={'/menu-items/edit/' +item._id} 
                            className="bg-gray-200 p-4 rounded-lg"
                        >
                            <div className="relative">
                                {item.image && (
                                    <Image 
                                        className="rounded-md"
                                        src={item.image} alt={''} width={200} height={200} />
                                )}
                                {!item.image &&(
                                    <div className="text-center bg-gray-300 p-4 text-gray-600 rounded-lg mb-1">
                                        No image
                                    </div>
                                )}
                            </div>
                            <div className="text-center">
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}