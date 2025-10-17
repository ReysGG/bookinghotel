import Image from "next/image";

interface HeaderSectionProps {
    title: string;
    description: string;
}



const HeaderSection = ({ title, description }: HeaderSectionProps) => {
    return (
        <>
        <div className="">
            <header className="relative h-60 text-white overflow-hidden ">
                <div className="absolute inset-0">
                    <Image src={'/FrontendImage/Hotel-Hero.jpg'} alt="Image" fill className="object-cover object-center w-full h-full"></Image>
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>
                <div className="relative flex flex-col justify-center items-center h-60 text-center pt-15">
                    <h1 className="text-5xl font-bold leading-tight capitalize">{title}</h1>
                    <p className="text-xl text-gray-300">{description}</p>
                </div>
            </header>
        </div>
        </>
    )
}

export default HeaderSection;