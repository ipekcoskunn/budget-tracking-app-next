import React from 'react'
import Link from "next/link";
import { FaUser } from "react-icons/fa";


const Header = () => {
    return (
        <header className="bg-primaryColor w-100 ">
            <div className="header-menu py-2 mx-auto container fluid">
                <div className="flex items-center justify-between text-white">
                    <Link className="flex items-center" href="/">
                        <FaUser />
                        <p className='p-1'>Budget Tracking App</p>
                    </Link>
                    <nav className="flex gap-2 text-white hover:*:underline leading-tight">
                        <Link href="/categories">Kategoriler</Link>
                        <Link href="/income">Gelirler</Link>
                        <Link href="/expense">Giderler</Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header