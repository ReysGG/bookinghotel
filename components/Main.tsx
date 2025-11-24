import { getRoom } from "@/lib/data";
import AnimatedContent from "./Animation/AnimatedContent";
import Card, { CardSkeleton } from "./Card";
import { notFound } from "next/navigation";


const Main = async () => {
    const rooms = await getRoom()
    if (!rooms) return notFound()
    return (<>
        <div className="max-w-screen-xl py-6 pb-20 px-4 mx-auto">
            <div className="grid gap-7 md:grid-cols-3">
                {rooms.map((room) => (
                    <Card room={room} key={room.id}></Card>
                ))}
            </div>
        </div>
    </>)
}

export default Main;

export function MainSkeleton (){
    return (
        <div className="max-w-screen-xl py-6 pb-20 px-4 mx-auto">
            <div className="grid gap-7 md:grid-cols-3">
                <CardSkeleton></CardSkeleton>
                <CardSkeleton></CardSkeleton>
                <CardSkeleton></CardSkeleton>
                <CardSkeleton></CardSkeleton>
                <CardSkeleton></CardSkeleton>
                <CardSkeleton></CardSkeleton>
            </div>
        </div>
    )
}