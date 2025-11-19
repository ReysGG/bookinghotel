import EditRoom from "@/components/admin/room/EditRoom"
import FormLoading from "@/components/admin/room/formloading"
import { redirect } from "next/dist/server/api-utils"
import { notFound } from "next/navigation"
import { Suspense } from "react"


const UpdateRoomPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const RoomID = (await params).id
    if (!RoomID) return notFound()
    return (
        <>
            <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto">
                <Suspense fallback={FormLoading()}>
                    <EditRoom roomID={RoomID}></EditRoom>
                </Suspense>
            </div>
        </>)
}

export default UpdateRoomPage