import { Room } from "@/lib/generated/prisma";
import { FormatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { IoPeopleOutline } from "react-icons/io5";
import Skeleton from "@/components/CardSkeleton"

const Card = ({ room }: { room: Room }) => {
    return (<>
        <div className="bg-white shadow-lg rounded-sm transition hover:shadow-sm hover:bg-gray-300">
            <div className="h-[260px] w-auto rounded-t-sm relative">
                <Image src={room.image}
                    alt="Image"
                    loading="lazy"
                    width={384}
                    height={256}
                    className="w-full h-full object-cover rounded-t-sm">
                </Image>
            </div>
            <div className="p-8">
                <h4 className="text-2xl font-medium">
                    <Link href={`/room/${room.id}`} className="hover:text-gray-800 transition duration-150">{room.name}</Link>
                </h4>
                <h4 className="text-2xl mb-7">
                    <span className=" font-semibold text-gray-600">{FormatCurrency(room.price)}</span>
                    <span className="text-gray-400 text-sm">/Night</span>
                </h4>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <IoPeopleOutline></IoPeopleOutline>
                        <span className="">{room.capacity} {room.capacity === 1 ? "person" : "People"}</span>
                    </div>
                    <Link href={`/room/${room.id}`} className="px-6 py-2.5 md:px-10 md:py-3 font-semibold text-white bg-blue-600 rounded-sm hover:bg-blue-500 transition duration-150">Book Now</Link>
                </div>
            </div>
        </div>
    </>)
}

export default Card;



export function CardSkeleton() {
    return (
        <div className="bg-white shadow-lg rounded-sm">
            {/* Image skeleton */}
            <div className="h-[260px] w-auto rounded-t-sm">
                <Skeleton className="w-full h-full rounded-t-sm" />
            </div>
            
            {/* Content skeleton */}
            <div className="p-8">
                {/* Room name */}
                <div className="mb-2">
                    <Skeleton className="h-8 w-3/4" />
                </div>
                
                {/* Price */}
                <div className="mb-7">
                    <Skeleton className="h-8 w-32" />
                </div>
                
                {/* Bottom section - Capacity & Button */}
                <div className="flex items-center justify-between">
                    {/* Capacity */}
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-5 w-5 rounded" />
                        <Skeleton className="h-5 w-20" />
                    </div>
                    
                    {/* Book Now button */}
                    <Skeleton className="h-11 w-32 rounded-sm" />
                </div>
            </div>
        </div>
    )
}