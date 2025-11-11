import RoomTable, { Loading } from "@/components/admin/room/RoomTable"
import Link from "next/link"
import { Suspense } from "react"

const ManageRoomPage = () => {
    return <>
        <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold text-gray-800">Room list</h1>
                <Link href="/admin/room/create" className="bg-blue-400 px-6 py-2.5 hover:bg-blue-600 text-white font-bold">Create new</Link>
            </div>
            <Suspense fallback={<Loading/>}>
                <RoomTable></RoomTable>
            </Suspense>
        </div>
    </>
}

export default ManageRoomPage