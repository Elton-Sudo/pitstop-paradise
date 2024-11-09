import ShoppingHeader from "@/components/shopping-view/header";
import { SimpleFooter } from "./footer";
import { useEffect, useState } from "react";

function PaymentPolicy() {

    const [showTopButton, setShowTopButton] = useState(false);

    useEffect(() => {
        // Show button when page is scrolled down 300px
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowTopButton(true);
            } else {
                setShowTopButton(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div 
        className="flex flex-col min-h-screen" 
        style={{
          backgroundImage: `url('https://res.cloudinary.com/daynaexaz/image/upload/v1728893288/blue-smokebg_cegir0.jpg')`,
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat', 
          backgroundAttachment: 'fixed', 
        }}
      >
            <ShoppingHeader />
            <div className="flex flex-col items-center justify-start min-h-screen mt-20">
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold">Payment Policy</h1>
                    <p className="mt-4">
                    ​At Pitstop Paradise, we prioritize offering secure and convenient payment options to enhance your shopping experience. We currently accept payments through iKhokha, which provides a range of flexible payment methods:
                    </p>
                </div>

                <div className="mt-8 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold text-left pl-4 text-white">iKhokha Payments</h1>
                    <p className="mt-4 text-left pl-4 text-white">
                    iKhokha supports the following payment options:

                    Visa and MasterCard: We accept both debit and credit cards from Visa and MasterCard for your convenience.
                    Contactless Payments: Enjoy the ease of contactless payments using your card or supported devices.
                    Digital Wallets: You can also make secure payments through digital wallets like Apple Pay and Google Pay.


                    </p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold">Refunds & Returns</h1>
                    <p className="mt-4">
                    ​Should a refund be necessary, it will be processed using the original payment method whenever possible. If that is not feasible, we will arrange a direct EFT to your bank account.

                    For more details on our policies, please visit our Refund & Returns Policy page or contact us at pitstopparadiseales@gmail.com.


                    </p>
                </div>

                

            </div>

            {showTopButton && (
                <div className="flex my-4">
                      {showTopButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-12 right-8 bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors"
                    aria-label="Back to top"
                >
                    ⬆️
                </button>
            )}
                </div>
            )}

            <SimpleFooter />
        </div>
    );
}

export default PaymentPolicy;