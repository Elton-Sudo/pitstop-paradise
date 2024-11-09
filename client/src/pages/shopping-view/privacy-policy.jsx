import ShoppingHeader from "@/components/shopping-view/header";
import { SimpleFooter } from "./footer";
import { useEffect, useState } from "react";

function PrivacyPolicy() {

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
                    <h1 className="text-4xl font-bold">Privacy Policy</h1>
                    <p className="mt-4">
                        This Privacy Policy outlines how your personal information is collected,
                        used, and shared when you visit or make a purchase from Pitstop Paradise.
                    </p>
                </div>

                <div className="mt-8 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold text-left pl-4 text-white">Personal Information We Collect</h1>
                    <p className="mt-4 text-left pl-4 text-white">
                        When you visit the Site, we automatically gather certain details about your device,
                        such as your web browser, IP address, time zone, and some of the cookies installed on your device.
                        As you navigate the Site, we also collect information about the specific web pages
                        or products you view, the websites or search terms that directed you to the Site,
                        and details on how you interact with the Site.
                        We refer to this automatically-collected data as “Device Information.”
                    </p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold">We collect Device Information using the following technologies:</h1>
                    <p className="mt-4">
                        Cookies: Data files placed on your device or computer, often including an anonymous unique identifier. For more information about cookies and how to disable them, visit http://www.allaboutcookies.org.
                        Log Files: Track actions occurring on the Site and collect data such as your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.
                        Web Beacons, Tags, and Pixels: Electronic files used to record information on how you browse the Site.
                        Additionally, when you make or attempt to make a purchase through the Site, we collect certain details from you, including your name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number. This is referred to as “Order Information.”

                        When we mention “Personal Information” in this Privacy Policy, we are referring to both Device Information and Order Information.
                    </p>
                </div>

                <div className="mt-8 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold text-left pl-4 text-white">How Do We Use Your Personal Information</h1>
                    <p className="mt-4 text-left pl-4 text-white">
                        We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:

                        Communicate with you;
                        Screen our orders for potential risk or fraud; and
                        When in line with the preferences you have shared with us, provide you with information or advertising related to our products or services.
                        We use the Device Information that we collect to help us screen for potential risk and fraud (particularly your IP address), and more broadly to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).
                    </p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold">Sharing Your Personal Information</h1>
                    <p className="mt-4">
                        We share your Personal Information with third parties to help us use your Personal Information as described above. For instance, we use Shopify to power our online store—you can read more about how Shopify uses your Personal Information here: https://www.shopify.com/legal/privacy. We also use Google Analytics to understand how our customers use the Site—you can read more about how Google uses your Personal Information here: https://www.google.com/intl/en/policies/privacy/. You can also opt out of Google Analytics here: https://tools.google.com/dlpage/gaoptout.

                        Finally, we may also share your Personal Information to comply with applicable laws and regulations, respond to a subpoena, search warrant, or other lawful request for information we receive, or to otherwise protect our rights.
                    </p>
                </div>

                <div className="mt-8 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold text-left pl-4 text-white">Behavioral Advertising</h1>
                    <p className="mt-4 text-left pl-4 text-white">
                        As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications that we believe may be of interest to you. For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.

                        You can opt out of targeted advertising by using the links below:

                        Facebook
                        Google
                        Bing
                        Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance’s opt-out portal at http://optout.aboutads.info/.
                    </p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold">​Do Not Track</h1>
                    <p className="mt-4">
                        ​Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.
                    </p>
                </div>

                <div className="mt-8 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold text-left pl-4 text-white">Your Rights</h1>
                    <p className="mt-4 text-left pl-4 text-white">
                        If you are a European resident, you have the right to access personal information we hold about you and to request that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us using the contact information provided below.

                        Additionally, if you are a European resident, we note that we are processing your information to fulfill contracts we might have with you (for instance, if you place an order through the Site), or otherwise to pursue our legitimate business interests as outlined above. Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.
                    </p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold">​​Data Retention</h1>
                    <p className="mt-4">
                        ​When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
                    </p>
                </div>

                <div className="mt-8 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold text-left pl-4 text-white">​​Changes</h1>
                    <p className="mt-4 text-left pl-4 text-white">
                        ​We may update this privacy policy from time to time to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.
                    </p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold">​​Minors</h1>
                    <p className="mt-4">
                    ​The Site is not intended for individuals under the age of 18.
                    </p>
                </div>

                <div className="mt-8 w-full max-w-3xl">
                    <h1 className="text-4xl font-bold text-left pl-4 text-white">​​Contact Us</h1>
                    <p className="mt-4 text-left pl-4 text-white">
                        For more information about our privacy practices, if you have any questions, or if you would like to make a complaint, please contact us by email at pitstopparadisesales@gmail.com or by mail using the details provided below:
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

export default PrivacyPolicy;
