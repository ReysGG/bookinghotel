import { getReservationById, getReservationByUserID } from "@/lib/data";
import { FormatCurrency, FormatDate } from "@/lib/utils";
import { differenceInCalendarDays, differenceInDays } from "date-fns";
import { notFound } from "next/navigation";

const ReservationDetail = async ({
  reservationId,
}: {
  reservationId: string;
}) => {
  const reservation = await getReservationById(reservationId);
  if (!reservation) return notFound();
  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-sm shadow">
      <div className="grid md:grid-cols-2 md:gap-5">
        <ul>
          <li className="py-2">
            <div className="flex items-center">
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Reservation ID
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900">
                #{reservation.id}
              </div>
            </div>
          </li>
          <li className="py-2">
            <div className="flex items-center">
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Book date
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900">
                {FormatDate(reservation.createdAt.toISOString())}
              </div>
            </div>
          </li>
          <li className="py-2">
            <div className="flex items-center">
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Name
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900">
                {reservation.User.name}
              </div>
            </div>
          </li>
          <li className="py-2">
            <div className="flex items-center">
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Email
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900">
                {reservation.User.email}
              </div>
            </div>
          </li>
        </ul>
        <ul>
          <li className="py-2">
            <div className="flex items-center">
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Phone number
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900">
                {reservation.User.phone}
              </div>
            </div>
          </li>
          <li className="py-2">
            <div className="flex items-center">
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Payment method
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 capitalize">
                {reservation.Payment?.method
                  ? reservation.Payment.method.replace("_", " ")
                  : null}
              </div>
            </div>
          </li>
          <li className="py-2">
            <div className="flex items-center">
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Payment status
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 capitalize">
                {reservation.Payment?.status}
              </div>
            </div>
          </li>
        </ul>
      </div>
      {/* table */}
      <div className="relative overflow-x-auto mt-3 py-6">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Room</th>
              <th className="px-6 py-3 min-w-60 md:min-w-0">Arival</th>
              <th className="px-6 py-3">Departure</th>
              <th className="px-6 py-3">Duration</th>
              <th className="px-6 py-3 text-right">Sub Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b">
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900 whitespace-nowrap">
                    {reservation.Room.name}
                  </span>
                  <span>Price: {reservation.Room.price}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                {FormatDate(reservation.startDate.toISOString())}
              </td>
              <td className="px-6 py-4">
                {FormatDate(reservation.endDate.toISOString())}
              </td>
              <td className="px-6 py-4">
                {differenceInCalendarDays(
                  reservation.endDate,
                  reservation.startDate
                )}{" "}
                night
              </td>
              <td className="px-6 py-4 text-right">
                {reservation.Payment &&
                  FormatCurrency(reservation.Payment.amount)}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="px-6 py-3 font-bold" colSpan={2}>
                Total
              </td>
              <td className="px-6 py-3 font-bold text-right" colSpan={3}>
                {reservation.Payment &&
                  FormatCurrency(reservation.Payment.amount)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ReservationDetail;
