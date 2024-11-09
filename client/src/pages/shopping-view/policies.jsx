import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SimpleFooter } from "./footer";

function Policies() {
    const navigate = useNavigate();

    const handleNavigation = (url) => {
        navigate(url);
    };

    return (
        <div 
            className="flex flex-col min-h-screen bg-cover bg-center"
            style={{ backgroundImage: 'url(https://res.cloudinary.com/daynaexaz/image/upload/v1728893288/blue-smokebg_cegir0.jpg)' }}
        >
            <div className="flex-grow flex justify-center items-center">
                <div className="flex flex-col space-y-4 items-center mx-auto w-full max-w-md p-4">
                    <Button 
                        className="policy-button w-full max-w-sm border border-white hover:bg-green-500"
                        onClick={() => handleNavigation('/privacy-policy')}
                    >
                        Privacy Policy
                    </Button>
                    <Button 
                        className="policy-button w-full max-w-sm border border-white hover:bg-green-500"
                        onClick={() => handleNavigation('/shipping-policy')}
                    >
                        Shipping Policy
                    </Button>
                    <Button 
                        className="policy-button w-full max-w-sm border border-white hover:bg-green-500"
                        onClick={() => handleNavigation('/refund-policy')}
                    >
                        Refund Policy
                    </Button>
                    <Button 
                        className="policy-button w-full max-w-sm border border-white hover:bg-green-500"
                        onClick={() => handleNavigation('/payment-policy')}
                    >
                        Payment Policy
                    </Button>
                    <Button 
                        className="policy-button w-full max-w-sm border border-white hover:bg-green-500"
                        onClick={() => handleNavigation('/terms')}
                    >
                        Terms & Conditions
                    </Button>
                </div>
            </div>
            <SimpleFooter className="mt-auto" />
        </div>
    );
}

export default Policies;
