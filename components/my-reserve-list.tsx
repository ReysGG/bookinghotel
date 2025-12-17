import { getReservationByUserID } from "@/lib/data";
import { FormatCurrency, FormatDate } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const MyReserveList = async () => {
  const reservation = await getReservationByUserID();
  if (!reservation) return notFound();

  return (
    <div>
      {reservation.map((item) => (
        <div
          className="bg-white shadow pb-4 mb-4 md:pb-0 relative"
          key={item.id}
        >
          <div className="flex items-center justify-between bg-gray-100 px-2 py-1 rounded-t-sm">
            <h1 className="text-sm font-medium text-gray-900 truncate">
              Reservation ID: #{item.id}
            </h1>
            <div className="flex gap-1 px-3 py-2 text-sm font-normal">
              <span>Status:</span>
              <span className="font-bold uppercase">
                {item.Payment?.status}
              </span>
            </div>
          </div>
          <div className="flex flex-col mb-4 items-start bg-white rounded-sm md:flex-row md:w-full">
            <Image
              src={item.Room.image}
              width={500}
              height={300}
              className="object-cover w-full rounded-t-sm h-60 md:h-auto md:w-1/3 md:rounded-none md:rounded-s-sm"
              alt="image room"
            ></Image>
            <div className="flex items-center gap-1 px-2 mb-3 font-normal text-gray-700 w-full">
              <div className="w-full ">
                <div className="flex items-center justify-between text-center font-medium text-gray-900 truncate">
                  <span>Price</span>
                  <span>{FormatCurrency(item.price)}</span>
                </div>
                <div className="flex items-center justify-between text-center font-medium text-gray-900 truncate">
                  <span>Arrival</span>
                  <span>{FormatDate(item.startDate.toISOString())}</span>
                </div>
                <div className="flex items-center justify-between text-center font-medium text-gray-900 truncate">
                  <span>Departure</span>
                  <span>{FormatDate(item.endDate.toISOString())}</span>
                </div>
                <div className="flex items-center justify-between text-center font-medium text-gray-900 truncate">
                  <span>Duration</span>
                  <span>
                    {differenceInCalendarDays(item.endDate, item.startDate)}
                    <span className="ml-1">Night</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-center font-medium text-gray-900 truncate">
                  <span>Sub total</span>
                  <span>
                    {item.Payment && FormatCurrency(item.Payment?.amount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-end absolute inset-4">
            {item.Payment?.status === "unpaid" ? (
              <Link
                href={`/checkout/${item.id}`}
                className="px-6 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Pay now
              </Link>
            ) : (
              <Link
                href={`/myreservation/${item.id}`}
                className="px-5 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                View detail
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyReserveList;
