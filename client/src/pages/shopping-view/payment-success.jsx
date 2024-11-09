import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `linear-gradient(
          rgba(0, 0, 0, 0.5), 
          rgba(0, 0, 0, 0.5)
        ), url('https://res.cloudinary.com/daynaexaz/image/upload/v1728893288/blue-smokebg_cegir0.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <Card className="p-10 m-auto bg-white/90 shadow-lg rounded-lg">
        <CardHeader className="p-0">
          <CardTitle className="text-4xl text-center text-green-500">
            Payment is successful!
          </CardTitle>
        </CardHeader>
        <Button className="mt-5 w-full" onClick={() => navigate("/shop/account")}>
          Login
        </Button>
      </Card>
    </div>
  );
}

export default PaymentSuccessPage;
