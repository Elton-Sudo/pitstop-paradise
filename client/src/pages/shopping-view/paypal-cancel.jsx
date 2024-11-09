
import { useLocation } from 'react-router-dom';

const PaypalCancelPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Payment Canceled</h1>
      <p className="mt-4">
        Your payment was canceled. If you would like to try again, please proceed to checkout.
      </p>
      <p className="mt-2">
        Cancellation Token: <strong>{token}</strong>
      </p>
      <a href="/shop/checkout" className="mt-4 text-blue-500 hover:underline">
        Go to Checkout
      </a>
    </div>
  );
};

export default PaypalCancelPage;
