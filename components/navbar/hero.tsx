'use client'

import Image from "next/image"
import Link from "next/link"
import SplitText from "../SplitText";
import DarkVeil from "../DarkVeil";

const Hero = () => {

    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };
    return (<>
        <div className=" relative h-screen text-white overflow-hidden">
            <div className="absolute inset-0">
                <Image src='/FrontendImage/Hotel-Hero.jpg' alt="Hotel" fill className=" object-cover object-center w-full h-full" loading="lazy"></Image>
                <div className="absolute inset-0 opacity-50">
                    <DarkVeil  />
                </div>
            </div>
            <div className="relative flex flex-col justify-center items-center h-full text-center">
                <SplitText
                    text="Book Your Luxury Room"
                    className="text-7xl font-extrabold leading-tight mb-3"
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                    onLetterAnimationComplete={handleAnimationComplete}
                />
                <p className="text-xl text-gray-30 mb-8">Get Special order just for you today.</p>
                <div className="flex gap-5">
                    <Link href='/room' className="bg-blue-400 text-white hover:bg-blue-600 py-2.5 px-6 md:px-10 text-lg font-semibold hover:scale-105 hover:shadow-lg">Book now</Link>
                    <Link href='/room' className="bg-transparent border border-blue-400 text-white hover:bg-blue-600 py-2.5 px-6 md:px-10 text-lg font-semibold hover:scale-105 hover:shadow-lg">Contact Us</Link>
                </div>
            </div>
        </div>
    </>)
}

export default Hero