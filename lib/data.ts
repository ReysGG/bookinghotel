import { auth } from "@/auth";
import { prisma } from "./prisma";
import { tr } from "zod/locales";

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

export const getReservationById = async (Reservationid: string) => {
    try {
        const result = await prisma.reservation.findUnique({
            where: {id: Reservationid},
            include: {
                Room: {
                    select: {
                        name: true,
                        price: true,
                        image: true,
                    }
                },
                User: {
                    select: {
                        name: true,
                        email:true,
                        phone: true
                    }
                },
                Payment: true,
            }
        })
        return result 
    } catch (error) {
        console.log(error)
    }
}

// Get Disable room by ID

export const getDisableRoomByID = async (roomID: string) => {
    try {
        const result = await prisma.reservation.findMany({
            select: {
                startDate: true,
                endDate: true,
            },
            where: {
                roomId: roomID,
                Payment: {status: {not: 'failure'}}
            }
        })
        return result
    } catch (error) {
        console.log(error);
        
    }
}

export const getReservationByUserID = async () => {
    const session  = await auth()
    if(!session || !session.user || !session.user.id){
        throw new Error("Unauthorized")
    }
    try {
        const result = await prisma.reservation.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                Room: {
                    select: {
                        name: true,
                        price: true,
                        image: true,
                    }
                },
                User:{
                    select:{
                        name: true,
                        email: true,
                        phone: true,
                    }
                },
                Payment: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return result
    } catch (error) {
        console.log(error)
    }
}

export const getRevenueAndReserve = async () => {
    try {
        const result = await prisma.reservation.aggregate({
            _count: true,
            _sum: {price:true},
            where:{
                Payment: {status: {not: 'failure'}}
            }
        })
        return {
            revenue: result._sum.price || 0,
            reserve: result._count 
        }
    } catch (error) {
        
    }
}

export const getTotalCustomer = async () => {
    try {
        const result = await prisma.reservation.findMany({
            distinct: ['userId'],
            where:{
                Payment: {status: {not: 'failure'}}
            },
            select: {
                userId: true
            }
        })
        return result
    } catch (error) {
        
    }
}

export const getReservations = async () => {
    const session  = await auth()
    if(!session || !session.user || !session.user.id || session.user.role !== 'admin'){
        throw new Error("Unauthorized")
    }
    try {
        const result = await prisma.reservation.findMany({
            include: {
                Room: {
                    select: {
                        name: true,
                        price: true,
                        image: true,
                    }
                },
                User:{
                    select:{
                        name: true,
                        email: true,
                        phone: true,
                    }
                },
                Payment: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return result
    } catch (error) {
        console.log(error)
    }
}
