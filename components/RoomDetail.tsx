import { getRoomDetails } from "@/lib/action";
import { RoomDetailProps } from "@/types/room";
import Image from "next/image";
import { notFound } from "next/navigation";


const RoomDetail = async ({roomID} : {roomID : string}) => {
    const room = await getRoomDetails(roomID)
    if(!room) return notFound()
  return (
    <div className="max-w-screen-xl py-16 px-4 grid lg:grid-cols-12 gap-8 mx-auto">
        <div className="md:col-span-8">
            <Image src={room.image} alt={room.name} width={770} height={430} priority className="w-full rounded-sm mb-8"></Image>
            <h1 className="text-5xl font-semibold text-gray-900 mb-8">{room.name}</h1>
            <p className="">{room.description}</p>
            <h5 className="text-lg font-bold py-1 mt-1 ">Amenities:</h5>
            <div className="grid md:grid-cols-3">
                {room.RoomAmenities.map((item, index) => (
                    <div className="" key={index}>
                        <span>{item.Amenities.name}</span>
                    </div>
                ))}
            </div>
        </div>
        <div className="md:col-span-4"></div>
    </div>
  );
};

export default RoomDetail;