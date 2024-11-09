import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div
        className="hidden lg:flex items-center justify-center w-1/2 px-12 bg-[url('https://res.cloudinary.com/daynaexaz/image/upload/v1728893288/blue-smokebg_cegir0.jpg')] bg-cover bg-center"
      >
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
        <img
            src="https://res.cloudinary.com/daynaexaz/image/upload/v1728726708/Pitstop_Paradise_logo_1_optimized_1000_ko3i9s.png"  
            alt="ECommerce Logo"
            className="mx-auto w-full max-w-[200px]"  
          />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;

