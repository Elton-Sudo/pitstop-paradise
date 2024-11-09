import { Button } from "@/components/ui/button";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import {
 
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import { SimpleFooter } from "./footer";


const categoriesWithIcon = [
  { id: "Vape Mods", label: "Vape Mods", icon: CloudLightning  },
  { id: "podvapes", label: "Pot Vapes", icon: CloudLightning },
  { id: "disposablevapes", label: "Disposable Vapes", icon: CloudLightning  },
  { id: "vapepens", label: "Vape Pens", icon: CloudLightning },
  { id: "cbd", label: "CBD", icon: CloudLightning  },
  
 
];

const brandsWithIcon = [
  { id: "airscream", label: "Airscream", iconUrl: "https://res.cloudinary.com/daynaexaz/image/upload/v1728751495/airscream_ojsrf5.jpg" },
  { id: "elfbar", label: "Alfbar", iconUrl: "https://res.cloudinary.com/daynaexaz/image/upload/v1728751136/elfbarlogo_k2slwf.webp" },
  { id: "nasty", label: "Nasty", iconUrl: "https://res.cloudinary.com/daynaexaz/image/upload/v1728751691/NASTY_LOGO_rtmfkl.png" },
  { id: "fume", label: "Fume", iconUrl: "https://res.cloudinary.com/daynaexaz/image/upload/v1728751845/fume-logo_ow7drb.webp" },
  { id: "airfuze", label: "Airfuze",  iconUrl: "https://res.cloudinary.com/daynaexaz/image/upload/v1730301734/mega-menu-116147-logo-671865073_320x_bbfc8p.avif" },
  { id: "ijoy", label: "Ijoy",  iconUrl: "https://res.cloudinary.com/daynaexaz/image/upload/v1728817442/Ijoy_yrgst9.png" },
];
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId,selectedFlavor) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
        selectedFlavor,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

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
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
                key={categoryItem.id}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 text-white">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-white" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-8 text-white">Shop by Brand</h2>
    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {brandsWithIcon.map((brandItem) => (
        <Card
          onClick={() => handleNavigateToListingPage(brandItem, "brand")}
          className="cursor-pointer hover:shadow-lg transition-shadow rounded-lg overflow-hidden" // Added rounded-lg and overflow-hidden
          key={brandItem.id}
        >
          <CardContent className="flex flex-col items-center justify-center p-0">
            {brandItem.iconUrl ? (
              <img 
                src={brandItem.iconUrl} 
                alt={brandItem.label} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>




      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
<a
  href="https://wa.me/27762567775" // Directly include your WhatsApp number
  className="fixed bottom-20 right-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition"
  target="_blank" // Open in a new tab
  rel="noopener noreferrer" // Security best practice
>
  <WhatsAppIcon className="w-10 h-10 text-green-500" />
</a>



       <div className="">
      <SimpleFooter/>
    </div>
  
    </div>
   
  );
}

export default ShoppingHome;
