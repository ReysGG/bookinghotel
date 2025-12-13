import { Prisma } from "@/lib/generated/prisma";

export type RoomProps = Prisma.RoomGetPayload<{
    // Ini sama persis dengan query yang Anda pakai di 'findUnique'
    include: {
        RoomAmenities: { select: { amenitiesId: true } }
    }
}>

export type RoomDetailProps = Prisma.RoomGetPayload<{
    include: {
                RoomAmenities: {
                    include: {
                        Amenities: {
                            select: {name: true}
                        }
                    }
                }
            }
}>

export type DisableDate = Prisma.ReservationGetPayload<{
    select: {
        startDate: true,
        endDate: true
    }
}>