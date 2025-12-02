import RoomDetail, { RoomDetailSkeleton } from "@/components/RoomDetail";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Room detail"
}
//{params:Promise<{roomId : string}>}) yang roomId nya harus sama dengan folder
const DetailPage =async ({params} : {params:Promise<{roomId : string}>}) => {
    const roomId = (await params).roomId
  return (
    <div className="mt-16">
      <Suspense fallback={RoomDetailSkeleton()}>
        <RoomDetail roomID={roomId}></RoomDetail>
      </Suspense>
      
    </div>
  );
};

export default DetailPage;