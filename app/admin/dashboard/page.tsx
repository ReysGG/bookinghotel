import DashboardCard from "@/components/admin/DashboardCard";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

const DashboardPage = () => {
  return (
    <>
      <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardCard />
        </Suspense>
      </div>
    </>
  );
};

export default DashboardPage;
