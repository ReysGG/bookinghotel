import ContactForm from "@/components/ContactForm"
import HeaderSection from "@/components/HeaderSection"
import { Metadata } from "next"
import { IoCallOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5"


export const metadata: Metadata = {
    title: "Contact",
    icons: {
        icon: "globe.svg"
    }
}

const ContactPage = () => {
    return <>
        <div className="">
            <HeaderSection title="Contact Us" description="Nibbers Nibbers Nibbers Nibbers"></HeaderSection>
            <div className="max-w-screen-xl mx-auto py-20 px-4">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h1 className="text-lg text-gray-500 mb-3">Contact us</h1>
                        <h1 className="text-5xl font-semibold text-gray-900 mb-4">Get in touch today</h1>
                        <p className="text-gray-700 py-5">If you have any questions or need assistance, feel free to reach out to us. Our team is here to help you with anything you need.</p>
                        <ul className="list-item space-y-6 pt-8">
                            <li className="flex gap-5">
                                <div className="flex-none bg-gray-300 p-3 shadow-sm rounded-sm">
                                    <IoMailOutline className="size-7"></IoMailOutline>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold mb-1">Email : </h4>
                                    <p>davidreysgg@gmail.com</p>
                                </div>
                            </li>
                            <li className="flex gap-5">
                                <div className="flex-none bg-gray-300 p-3 shadow-sm rounded-sm">
                                    <IoCallOutline className="size-7"></IoCallOutline>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold mb-1">Phone number : </h4>
                                    <p>+6289637279945</p>
                                </div>
                            </li>
                            <li className="flex gap-5">
                                <div className="flex-none bg-gray-300 p-3 shadow-sm rounded-sm">
                                    <IoLocationOutline className="size-7"></IoLocationOutline>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold mb-1">Address : </h4>
                                    <p>Jl. Raya Canggu No.88, Kec. Kuta Utara, Kabupaten Badung, Bali 80361
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* Contact form */}
                    <div>
                        <ContactForm></ContactForm>
                    </div>

                </div>
                
            </div>
        </div>
    </>
}

export default ContactPage