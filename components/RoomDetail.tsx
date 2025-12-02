import { getRoomDetails } from "@/lib/action";
import { FormatCurrency } from "@/lib/utils";
import { RoomDetailProps } from "@/types/room";
import Image from "next/image";
import { notFound } from "next/navigation";
import { IoCheckmark, IoPeopleOutline } from "react-icons/io5";
import ReserveForm from "./ReserveForm";
import "react-datepicker/dist/react-datepicker.css"
import Skeleton from "./CardSkeleton";


const RoomDetail = async ({ roomID }: { roomID: string }) => {
    const room = await getRoomDetails(roomID)
    if (!room) return notFound()
    return (
        <div className="max-w-screen-xl py-16 px-4 grid lg:grid-cols-12 gap-8 mx-auto">
            <div className="md:col-span-8">
                <Image src={room.image} alt={room.name} width={770} height={430} priority className="w-full rounded-sm mb-8"></Image>
                <h1 className="text-5xl font-semibold text-gray-900 mb-8">{room.name}</h1>
                <p className=" break-words">{room.description}</p>
                <h5 className="text-lg font-bold py-1 mt-1 ">Amenities:</h5>
                <div className="grid md:grid-cols-3">
                    {room.RoomAmenities.map((item, index) => (
                        <div className="flex gap-1 py-1" key={index}>
                            <IoCheckmark className="size-5"></IoCheckmark>
                            <span>{item.Amenities.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="md:col-span-4">
                <div className="border-2 border-gray-400 border-dashed px-3 py-5 bg-slate-50 rounded-md">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-2">
                            <IoPeopleOutline className="size-4"></IoPeopleOutline>
                            <span>
                                {room.capacity} {room.capacity == 1 ? "Person" : "People"}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-2xl font-semibold text-gray-600">{FormatCurrency(room.price)}</span>
                            <span className="text-gray-400 text-sm">/Night</span>
                        </div>
                    </div>
                    {/* Reservation room */}
                    <ReserveForm room={room}></ReserveForm>
                </div>
            </div>
        </div>
    );
};

export default RoomDetail;

export function RoomDetailSkeleton() {
    return (
        <div className="max-w-screen-xl py-16 px-4 grid lg:grid-cols-12 gap-8 mx-auto">
            {/* Left Column - Room Details */}
            <div className="md:col-span-8">
                {/* Image skeleton */}
                <Skeleton className="w-full h-[430px] rounded-sm mb-8" />
                
                {/* Room name skeleton */}
                <Skeleton className="h-12 w-3/4 mb-8" />
                
                {/* Description skeleton */}
                <div className="space-y-2 mb-6">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                </div>
                
                {/* Amenities title */}
                <Skeleton className="h-6 w-32 mb-2" />
                
                {/* Amenities grid */}
                <div className="grid md:grid-cols-3 gap-2">
                    {[...Array(6)].map((_, index) => (
                        <div className="flex gap-1 py-1" key={index}>
                            <Skeleton className="h-5 w-5 rounded" />
                            <Skeleton className="h-5 w-24" />
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Right Column - Reservation Form */}
            <div className="md:col-span-4">
                <div className="border-2 border-gray-400 border-dashed px-3 py-5 bg-slate-50 rounded-md">
                    {/* Capacity & Price section */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-2">
                            <Skeleton className="h-4 w-4 rounded" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                        <div className="flex items-center gap-1">
                            <Skeleton className="h-8 w-24" />
                        </div>
                    </div>
                    
                    {/* Reserve Form Skeleton */}
                    <ReserveFormSkeleton />
                </div>
            </div>
        </div>
    )
}

export function ReserveFormSkeleton() {
    return (
        <div>
            {/* Date picker field */}
            <div className="mb-4">
                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-10 w-full rounded-md" />
            </div>
            
            {/* Name field */}
            <div className="mb-4">
                <Skeleton className="h-5 w-24 mb-2" />
                <Skeleton className="h-10 w-full rounded-md" />
            </div>
            
            {/* Phone field */}
            <div className="mb-4">
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-10 w-full rounded-md" />
            </div>
            
            {/* Submit button */}
            <Skeleton className="h-12 w-full rounded-sm" />
        </div>
    )
}