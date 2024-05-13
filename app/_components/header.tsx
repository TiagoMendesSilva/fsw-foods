"use client"

import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

import { signIn, signOut, useSession } from 'next-auth/react'

const Header = () => {

    const { data } = useSession();

    return (  
        <div className="flex justify-between pt-6 px-5">
            <div className="relative h-[30px] w-[100px]">
                <Link href={"/"}>
                    <Image src="/logo.png" alt="FSW foods" fill className="object-cover" />
                </Link>
            </div>
            
            {/* Para testar o Login */}

            {data?.user?.name 
            ? ( 
            <div className="flex gap-1 items-center">
                <h1>{data.user.name}</h1>
                <Button onClick={() => signOut()}>
                Sair
                </Button>
            </div> 
            )
            : ( 
                <Button onClick={() => signIn()}>
                Login
                </Button> 
            ) 
            }
            

            <Button size="icon" variant="outline" className="border-none bg-transparent">
                <MenuIcon></MenuIcon>
            </Button>
        </div>
    );
}
 
export default Header;