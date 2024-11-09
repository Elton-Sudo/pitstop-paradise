import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import PropTypes from "prop-types"; 

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
      <SheetContent
      className="sm:max-w-md bg-cover bg-center"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/daynaexaz/image/upload/v1728893288/blue-smokebg_cegir0.jpg')",
      }}
    >
      <SheetHeader>
      <SheetTitle style={{ color: 'white' }}>Your Cart</SheetTitle>

      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UserCartItemsContent cartItem={item} />)
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold text-white">Total</span>
          <span className="font-bold text-white">R{totalCartAmount}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

UserCartWrapper.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      salePrice: PropTypes.number,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })
  ).isRequired, 
  setOpenCartSheet: PropTypes.func.isRequired, 
};

export default UserCartWrapper;
