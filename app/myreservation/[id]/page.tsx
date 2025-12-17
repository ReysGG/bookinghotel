import ReservationDetail from "@/components/reservationdetail";

const MyReservationDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const reservationID = (await params).id;
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-screen-xl mx-auto mt-10 py-20 px-4">
        {/* Reservatoion detail */}
        <ReservationDetail reservationId={reservationID} />
      </div>
    </div>
  );
};

export default MyReservationDetailPage;
