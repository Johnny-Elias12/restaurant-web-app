"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage(){
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [name, setName] = useState('');
    const [userCreated, setUserCreated] = useState(false);
    const [creatingUser, setCreatingUser]= useState(false);
    const [error, setError]= useState(false);
   

    async function handleFormSubmit(ev){
        ev.preventDefault();
        setCreatingUser(true);
        setError(false);
        setUserCreated(false)
        const response= await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers: {'Content-Type': 'application/json'},
        });
        
        if(response.ok){
            setUserCreated(true);
        }else{
            setError(true)
        }
        setCreatingUser(false);
    }

    return(
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Register
            </h1>
            {userCreated && (
                <div className="my-4 text-center">
                    User created. Now you can <Link className="underline" href={'/login'}>Login &raquo;</Link>
                </div>
            )}
            {error && (
                <div className="my-4 text-center">
                    Error <br />
                    Please try again later
                </div>
            )}
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    disabled={creatingUser}
                    onChange={ev => setName(ev.target.value)}
                    />
                <input type="email" placeholder="email" value={email} 
                        disabled={creatingUser}
                        onChange={ev=>setEmail(ev.target.value)}/>
                <input type="password" placeholder="password" value={password} 
                        disabled={creatingUser}
                        onChange={ev=>setPassword(ev.target.value)}/>
                <button type="submit" disabled={creatingUser}>
                    Register
                </button>
                <div className="my-4 text-center text-gray-500">
                    or login with provider
                </div>
                
                <button className="flex gap-4 justify-center"
                    type="button" onClick={() => signIn('google', {callbackUrl: '/'})}>
                <Image src="/google.png" alt={''} width={24} height={24} />
                    Login with google
                </button>
                {!userCreated &&(
                <div className="text-center my-4 text-gray-500 border-t pt-4">
                    Already have an account? <Link className="underline" href="/login">Login here</Link>
                </div>)}
            </form>
        </section>
    );
}