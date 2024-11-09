import { LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer text-white"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
    setIsLoggedIn(false);
  }

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="group cursor-pointer">
          <Avatar className="bg-black group-hover:bg-green-500">
  {isLoggedIn ? (
    <AvatarFallback className="bg-black text-white font-extrabold group-hover:bg-green-500 group-hover:text-white">
      {user?.userName?.[0]?.toUpperCase()}
    </AvatarFallback>
  ) : (
    <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
      Login
    </span>
  )}
</Avatar>

          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          {isLoggedIn && (
            <>
              <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/shop/account")}>
                <UserCog className="mr-2 h-4 w-4" />
                Account
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem
            onClick={isLoggedIn ? handleLogout : () => navigate("/auth/login")}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {isLoggedIn ? "Logout" : "Login"}
          </DropdownMenuItem>
          {!isLoggedIn && (
            <DropdownMenuItem onClick={() => navigate("/auth/register")}>
              <LogOut className="mr-2 h-4 w-4" />
              Register
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}


function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header
      style={{
        backgroundImage: "url('https://res.cloudinary.com/daynaexaz/image/upload/v1728893288/blue-smokebg_cegir0.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="sticky top-0 z-40 w-full border-b"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-80"></div>
      
      <div className="relative z-10 flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center">
          <img 
            src="https://res.cloudinary.com/daynaexaz/image/upload/v1728726708/Pitstop_Paradise_logo_1_optimized_1000_ko3i9s.png" 
            alt="Ecommerce Logo" 
            className="h-20 w-16 mt-3"
          />
        </Link>
    
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
    
        <div className="hidden lg:block">
          <MenuItems />
        </div>
    
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}


export default ShoppingHeader;
