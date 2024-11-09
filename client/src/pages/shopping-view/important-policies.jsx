import { useNavigate } from "react-router-dom"; 
import { Button } from "@/components/ui/button";


function ImportantPolicies() {
    const navigate = useNavigate(); 

    const handleNavigation = (url) => {
        navigate(url); 
    };

    return (
        <div>

       

        <div className="flex flex-col space-y-4 items-center mt-16">
            <Button 
                className="policy-button w-full max-w-sm" 
                onClick={() => handleNavigation('/privacy-policy')}
            >
                Privacy Policy
            </Button>
            <Button 
                className="policy-button w-full max-w-sm" 
                onClick={() => handleNavigation('/shipping-policy')}
            >
                Shipping Policy
            </Button>
            <Button 
                className="policy-button w-full max-w-sm" 
                onClick={() => handleNavigation('/refund-policy')}
            >
                Refund Policy
            </Button>
            <Button 
                className="policy-button w-full max-w-sm" 
                onClick={() => handleNavigation('/payment-policy')}
            >
                Payment Policy
            </Button>
            <Button 
                className="policy-button w-full max-w-sm" 
                onClick={() => handleNavigation('/payment-policy')}
            >
                Terms & Conditions
            </Button>
        </div>
        </div>
    );
}

export default ImportantPolicies;