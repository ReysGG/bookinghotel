import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return (<>
        <footer className="bg-gray-900 ">
            <div className="max-w-screen-xl mx-auto px-3 w-full py-10 md:py-16">
                <div className="grid md:grid-cols-3 gap-7">
                    <div>
                        <Link href='/' className="mb-7 inline-block">
                            <Image src='/FrontendImage/Logo.png' width={128} height={49} alt="logo" priority />
                        </Link>
                        <p className="text-gray-400">
                            Zwistel is a platform that provides the best services for hotel booking. We are committed to making your travel experience unforgettable.
                        </p>
                    </div>
                    <div>
                        <div className="flex gap-30">
                            <div className="flex-1 md:flex-none">
                                <h4 className="mb-8 text-xl font-semibold text-white">Links</h4>
                                <ul className="list-item space-y-5 text-gray-400">
                                    <li><Link href="/">Home</Link></li>
                                    <li><Link href="/about">About Us</Link></li>
                                    <li><Link href="/room">Rooms</Link></li>
                                    <li><Link href="/Contact">Contact Us</Link></li>
                                </ul>
                                    
                            </div>
                             <div className="flex-1 md:flex-none">
                                <h4 className="mb-8 text-xl font-semibold text-white">Legal</h4>
                                <ul className="list-item space-y-5 text-gray-400">
                                    <li><Link href="#">Legal</Link></li>
                                    <li><Link href="#">Syarat & Ketentuan</Link></li>
                                    <li><Link href="#">Payment Method</Link></li>
                                    <li><Link href="#">Privacy polity</Link></li>
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-8 text-xl font-semibold text-white">Newsletter</h4>
                        <p className="text-gray-400">
                            Subscribe to our newsletter to get the latest news and offers.
                        </p>
                        <form action="" className="mt-5">
                            <div className="mb-5">
                                <input type="text" name="email" className="w-full p-3 rounded-sm bg-white" placeholder="Example@email.com"/>
                            </div>
                            <button className="bg-blue-400 p-3 font-bold text-white w-full text-center rounded-sm hover:bg-blue-600">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="max-w-screen-xl mx-auto px-4 border-t border-gray-300 py-8 text-center text-base text-gray-500">
                &copy; 2025 Zwistel. All rights reserved.
            </div>
        </footer>
    </>)
}

export default Footer