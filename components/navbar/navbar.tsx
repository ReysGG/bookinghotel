import Image from "next/image";
import Link from "next/link";
import NavLink from "./navlink";



const Navbar = () => {
    return (
        <div className="fixed top-0 z-20 w-full bg-white shadow-sm">
            <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
                <Link href='/'>
                    <Image src='/FrontendImage/Logo.png' width={128} height={49} alt="logo" priority />
                </Link>
                <NavLink></NavLink>
            </div>
        </div>
    )
}

export default Navbar;