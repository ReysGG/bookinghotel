import { deleteRoom } from "@/lib/action"
import Link from "next/link"
import { IoPencil, IoTrashOutline } from "react-icons/io5"



export const Deletebutton = ({id, imageURL} : {id: string, imageURL : string}) => {
    // Alasan pake bind, supaya nempel. kerena
    const DeleteRoomWithID = deleteRoom.bind(null, id, imageURL)
    return (
        // Formnya ga tau, kalau DeleteRoomWITHID minta id ama imageurl, sedangkan ini cuman ada button
        <form action={DeleteRoomWithID}> 
            <button type="submit" className="rounded-sm p-1 hover:bg-gray-200 cursor-pointer">
                <IoTrashOutline className="size-5"></IoTrashOutline>
            </button>
        </form>
    )
}
 
export const Editbutton = ({id} : {id: string}) => {
    return (
        <Link href={`/admin/room/edit/${id}`} className="rounded-sm p-1 hover:bg-gray-200">
            <IoPencil className="size-5"></IoPencil>
        </Link>
    )
} 