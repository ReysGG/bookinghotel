import { auth } from "@/auth";
import { prisma } from "./prisma";

export const getAmenities = async () => {
    const session = await auth()
    if (!session || !session.user) {
        throw new Error("Unauthorize access")
    }
    try {
        const result = await prisma.amenities.findMany()
        return result
    } catch (error) {
        console.log(error)
    }
}

export const getRoom = async () => {
    try {
        const result = await prisma.room.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return result
    } catch (error) {
        console.log(error)
    }
}


export const getRoomByID = async (roomID: string) => {
    try {
        const result = await prisma.room.findUnique({
            where: {id: roomID},
            include: {
                RoomAmenities: {select: {amenitiesId: true}}
            }
        })
        return result
    } catch (error) {
        console.log(error);
        
    }
}
