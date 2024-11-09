import ShoppingHeader from "@/components/shopping-view/header";
import { SimpleFooter } from "./footer";
import { useEffect, useState } from "react";

function ShppingPolicy() {

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
                    <h1 className="text-4xl font-bold">Shipping Policy</h1>
                    <p className="mt-4">
                    We process orders twice every weekday/business day. The first processing slot is at 10 AM, and the second is at 2 PM. This means we dispatch orders with our trusted couriers twice a day to ensure timely delivery.
                    </p>
                </div>

                <div className="mt-8 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold text-left pl-4 text-white">Delivery Time Estimates</h1>
                    <p className="mt-4 text-left pl-4 text-white">
                    Our shipping policy is designed to make your shopping experience as smooth and hassle-free as possible. We offer a flat shipping rate of R200 and free shipping on orders over R1000. All orders are processed and shipped promptly to ensure you receive your car parts or vape supplies as quickly as possible.
                    </p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold">Rest of South Africa</h1>
                    <p className="mt-4">
                    Main Centres include Johannesburg, Pretoria, Bloemfontein, Durban, Port Elizabeth, East London, George, Kimberley, Ladysmith, Nelspruit, Polokwane, Potchefstroom, Welkom, and Witbank.


                    </p>
                </div>

                <div className="mt-8 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold text-left pl-4 text-white">International Delivery</h1>
                    <p className="mt-4 text-left pl-4 text-white">
                    We currently only deliver within South Africa.
                    </p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold">List of Main Centres</h1>
                    <p className="mt-4">
                    Main Centres are Johannesburg, Pretoria, Bloemfontein, Durban, Port Elizabeth, East London, George, Kimberley, Ladysmith, Nelspruit, Polokwane, Potchefstroom, Welkom, and Witbank.

Any delivery address within 50km of these city centers qualifies for Main Centre delivery options.
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

export default ShppingPolicy;
