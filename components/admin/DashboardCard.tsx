import { LuChartArea, LuShoppingCart, LuUser, LuUsers } from "react-icons/lu";
import { getRevenueAndReserve, getTotalCustomer } from "@/lib/data";
import { notFound } from "next/navigation";
import { FormatCurrency } from "@/lib/utils";

const DashboardCard = async () => {
  const [data, customer] = await Promise.all([
    getRevenueAndReserve(),
    getTotalCustomer(),
  ]);

  if (!data || !customer) return notFound();
  return (
    <div className="grid md:grid-cols-3 gap-5 pb-10 mt-4">
      <div className="flex items-center bg-white border rounded-md overflow-hidden shadow-sm">
        <div className="p-4 bg-green-400">
          <LuChartArea className="size-12 text-white" />
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Revenue</h3>
          <p className="text-3xl font-semibold">
            ${FormatCurrency(data.revenue)}
          </p>
        </div>
      </div>
      <div className="flex items-center bg-white border rounded-md overflow-hidden shadow-sm">
        <div className="p-4 bg-red-400">
          <LuShoppingCart className="size-12 text-white" />
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Reservation</h3>
          <p className="text-3xl font-semibold">{data.reserve}</p>
        </div>
      </div>
      <div className="flex items-center bg-white border rounded-md overflow-hidden shadow-sm">
        <div className="p-4 bg-blue-400">
          <LuUsers className="size-12 text-white" />
        </div>
        <div className="px-4 text-gray-700">
          <h3 className="text-sm tracking-wider">Total Customers</h3>
          <p className="text-3xl font-semibold">{customer.length}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
