import { getAmenities, getRoomByID } from "@/lib/data"
import CreateForm from "./CreateForm"
import Skeleton from "@/components/CardSkeleton"
import EditForm from "./EditForm"
import { notFound } from "next/navigation"



const EditRoom = async ({roomID} : {roomID : string}) => {
    //mengambil data secara bersamaan, supaya lebih efisien
    const [amenities, room] = await Promise.all([getAmenities(), getRoomByID(roomID) ])
    if(!amenities || !room) return notFound()

    return (<>
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Edit room</h1>
            <EditForm amenities={amenities} room={room}></EditForm>
        </div>
    </>)
}

export default EditRoom

