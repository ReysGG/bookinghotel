import Skeleton from "@/components/CardSkeleton"
import { getRoom } from "@/lib/data"
import { FormatCurrency, FormatDate } from "@/lib/utils"
import Image from "next/image"

export function Loading() {
    return (
        <div className="bg-white p-4 mt-5 shadow-sm">
            <table className="w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">
                            Image
                        </th>
                        <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">
                            Room name
                        </th>
                        <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">
                            Price
                        </th>
                        <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">
                            Created at
                        </th>
                        <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {[...Array(5)].map((_, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="px-6 py-4">
                                <Skeleton className="h-20 w-32" />
                            </td>
                            <td className="px-6 py-4">
                                <Skeleton className="h-4 w-40" />
                            </td>
                            <td className="px-6 py-4">
                                <Skeleton className="h-4 w-24" />
                            </td>
                            <td className="px-6 py-4">
                                <Skeleton className="h-4 w-32" />
                            </td>
                            <td className="px-6 py-4">
                                <Skeleton className="h-4 w-16 ml-auto" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


const RoomTable = async () => {
    const Rooms = await getRoom()

    if (!Rooms?.length) return <><p>No room found</p></>

    return <>
        <div className="bg-white p-4 mt-5 shadow-sm">
            {/* table>(thead>tr>th*5)+(tbody>tr>td*5) */}
            <table className="w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">
                            Image
                        </th>
                        <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">
                            Room name
                        </th>
                        <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">
                            Price
                        </th>
                        <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">
                            Created at
                        </th>
                        <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                    {Rooms.map((item) => (
                        <tr className="hover:bg-gray-100" key={item.id}>
                            <td className="px-6 py-4">
                                <div className="h-20 w-32 relative">
                                    <Image src={item.image} fill sizes="20vw" alt="room image" className="object-cover"></Image>
                                </div>
                            </td>
                            <td className="px-6 py-4">{item.name}</td>
                            <td className="px-6 py-4">{FormatCurrency(item.price)}</td>
                            <td className="px-6 py-4">{FormatDate(item.createdAt.toString())}</td>
                            <td className="px-6 py-4 text-right"></td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    </>
}

export default RoomTable