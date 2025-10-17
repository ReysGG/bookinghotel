import HeaderSection from "@/components/HeaderSection"
import Image from "next/image"
import { IoEyeOutline, IoLocateOutline } from "react-icons/io5"

const AboutPage = () => {
    return (
        <>
            <div className="mt-8">
                <HeaderSection title="About Us" description="Hotel murah berkualtias"></HeaderSection>
                <div className="max-w-screen-xl mx-auto py-20 px-4">
                    <div className="grid md:grid-cols-2 gap-8">
                        <Image src={'/FrontendImage/About_Hotel.jpg'} alt="about" width={650} height={579}></Image>
                        <div className="">
                            <h1 className="text-5xl font-semibold text-gray-900 mb-4">Who we are</h1>
                            <p className="text-gray-800 py-5">
                                Hotel ini adalah sebuah tempat penginapan yang menyediakan berbagai fasilitas dan layanan untuk para tamu yang menginap. Hotel ini biasanya memiliki beberapa kamar yang dapat disewa oleh tamu untuk jangka waktu tertentu, mulai dari beberapa jam hingga beberapa hari atau minggu.
                            </p>
                            <ul className="list-item space-y-6 pt-8">
                                <li className="flex gap-5">
                                    <div className="flex-none mt-1">
                                        <IoEyeOutline className="size-7"></IoEyeOutline>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-semibold mb-1">Vision : </h4>
                                        <p className="text-gray-600">
                                            Menjadi hotel terkemuka yang dikenal karena pelayanan prima, kenyamanan luar biasa, dan pengalaman tak terlupakan bagi setiap tamu.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex gap-5">
                                    <div className="flex-none mt-1">
                                        <IoLocateOutline className="size-7"></IoLocateOutline>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-semibold mb-1">Mission : </h4>
                                        <p className="text-gray-600">
                                            Menyediakan layanan berkualitas tinggi dengan perhatian terhadap detail, menciptakan lingkungan yang nyaman dan ramah, serta berkomitmen untuk memenuhi kebutuhan dan harapan setiap tamu </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutPage