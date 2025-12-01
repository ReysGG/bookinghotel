

const CheckOutPage = async ({params} : {params: Promise<{checkoutID: string}>}) => {
    const checkoutID = (await params).checkoutID
  return (
    <div>
      <h2>Page</h2>
    </div>
  );
};

export default CheckOutPage;