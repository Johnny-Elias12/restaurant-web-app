'use client';
import Link from "next/link"
import { signOut, useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart"
import Bars2 from "@/components/icons/Bars2"



function AuthLinks ({status, userName}) {

      if(status === 'authenticated') {
        return (
          <>
          <Link href={'/profile'}>{userName}</Link>
          <button 
              onClick={() => signOut()}
                className="bg-primary rounded-full text-white px-6 py-2">
                      Logout
            </button>
          </>
        );
      }

        if(status === 'unauthenticated'){
          return(
            <>
              <Link href="/login">Login</Link>
              <Link href={'/register'} className="bg-primary rounded-full text-white px-6 py-2">Register</Link>
            </>
          );
        }
  }


export default function Header(){
  const session = useSession();
  const {cartProducts} = useContext(CartContext)

  const status= session?.status;
  const userData= session.data?.user;
  let userName= userData?.name || userData?.email;
  // const {cartProducts} = useContext(CartContext)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  if (userName && userName.includes(' ')){
    userName = userName.split(' ')[0];
  }

    return(
        <header>
          <div className="flex items-center md:hidden justify-between">
              <Link className="text-primary font-semibold text-2xl uppercase" href="/">
                Snack Johnny
              </Link>
              <div className="flex gap-8 items-center">
                
                <Link href={'/cart'} className="relative">
                    <ShoppingCart />
                    {cartProducts?.length > 0 && (
                      <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                          {cartProducts.length}
                      </span>
                    )}
                    
                  </Link>
                  <button 
                    className="p-1 border-0"
                    onClick={() => setMobileNavOpen(prev => !prev)}
                  >
                  <Bars2 />
                </button>
              </div>
          </div>
          {mobileNavOpen && (
              <div 
                className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center"
                onClick={() => setMobileNavOpen(false)}
              >
                <Link href={'/'}>Home</Link>
                <Link href={'/menu'}>Menu</Link>
                <Link href={'/#about'}>About</Link>
                <Link href={'/#contact'}>Contact</Link>
                <AuthLinks status={status} userName={userName}/>
              </div>
          )}

          <div className="hidden md:flex items-center justify-between">
            <nav className="flex items-center gap-8 text-gray-500 font-semibold">
              <Link className="text-primary font-semibold text-2xl uppercase" href="/">
                Snack Johnny
              </Link>
                <Link href={'/'}>Home</Link>
                <Link href={'/menu'}>Menu</Link>
                <Link href={'/#about'}>About</Link>
                <Link href={'/#contact'}>Contact</Link>
              </nav>
            
              <nav className="flex items-center gap-4 text-gray-500 font-semibold">
                <AuthLinks status={status} userName={userName}/>
                  <Link href={'/cart'} className="relative">
                    <ShoppingCart />
                    {cartProducts?.length > 0 && (
                      <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                          {cartProducts.length}
                      </span>
                    )}
                    
                  </Link>
              </nav>

          </div>
        
      </header>
    );
}