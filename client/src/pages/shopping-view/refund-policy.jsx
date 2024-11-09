import ShoppingHeader from "@/components/shopping-view/header";
import { SimpleFooter } from "./footer";
import { useEffect, useState } from "react";

function RefundPolicy() {

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
                    <h1 className="text-4xl font-bold">Refund Policy</h1>
                    <p className="mt-4">
                    At Pitstop Paradise, we understand the importance of having the option to return and receive a refund when shopping online. We've made it easy for you to request a return and receive a refund if you receive the wrong or defective item.
                    </p>
                </div>

                <div className="mt-8 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold text-left pl-4 text-white">Eligibility for Returns</h1>
                    <p className="mt-4 text-left pl-4 text-white">
                    ​To be eligible for a return, your item must be in the same condition that you received it—unworn or unused, with tags, and in its original packaging. We only accept returns on orders placed with Pitstop Paradise.
                    </p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold ">​How to Submit a Return Request</h1>
                    <p className="mt-4">
                    ​You can submit a refund request by visiting your customer account and selecting the order and items you'd like to return for a refund.
                    </p>
                </div>

                <div className="mt-8 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold text-left pl-4 text-white">​1-Month Warranty on Select Devices</h1>
                    <p className="mt-4 text-left pl-4 text-white">
                    ​We offer a 1-month warranty period on select devices. If your device is defective within that time frame, you can request a return and refund free of charge.
                    </p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold ">3-Day "Changed My Mind" Policy</h1>
                    <p className="mt-4">
                    ​We have a 3-day "Changed My Mind" return policy, which means you have 3 days after receiving your item to request a return if you've changed your mind. The item must be in its original condition and packaging. Please note that the customer is responsible for 100% of the return delivery fees, ranging from R100-R130, depending on the collection location.
                    </p>
                </div>

                <div className="mt-8 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold text-left pl-4 text-white">Return Process</h1>
                    <p className="mt-4 text-left pl-4 text-white">
                    If your return is accepted, we’ll provide you with a return shipping label and instructions on how to package the return. Our courier partner will collect the return within 1-2 days. Items sent back without first requesting a return will not be accepted.

For any questions regarding returns, please contact us at pitstopparadise@gmail.com.
                    </p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold">​Getting a Refund</h1>
                    <p className="mt-4">
                    ​Once we've received your item at our warehouse, our team will evaluate the returned product. If the product is in satisfactory condition, you will receive a gift card for the value of the returned product at the time of purchase.
                    </p>
                </div>

                <div className="mt-8 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold text-left pl-4 text-white">​Damages and Issues</h1>
                    <p className="mt-4 text-left pl-4 text-white">
                    ​Please inspect your order upon receipt and contact us immediately if the item is defective, damaged, or if you receive the wrong item, so we can evaluate the issue and make it right.
                    </p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold">​​Return Process</h1>
                    <p className="mt-4">
                    If your return is accepted, we’ll provide you with a return shipping label and instructions on how to package the return. Our courier partner will collect the return within 1-2 days. Items sent back without first requesting a return will not be accepted.
                    </p>
                </div>

                <div className="mt-8 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold text-left pl-4 text-white">​​Getting a Refund</h1>
                    <p className="mt-4 text-left pl-4 text-white">
                    Certain types of items cannot be returned, such as perishable goods and custom products. We also do not accept returns for hazardous materials, flammable liquids, or gases. If you have any questions or concerns about your specific item, please get in touch.

Unfortunately, we cannot accept returns on sale items or gift cards.
                    </p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold">​​Exchanges</h1>
                    <p className="mt-4">
                    The fastest way to get what you want is to return the item you have. Once the return is accepted, you can make a separate purchase for the new item.
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

export default RefundPolicy;
