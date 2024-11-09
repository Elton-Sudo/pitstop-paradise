import { Route, Routes, Navigate } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import PaypalCancelPage from "./pages/shopping-view/paypal-cancel";
import Policies from "./pages/shopping-view/policies";
import PrivacyPolicy from "./pages/shopping-view/privacy-policy";
import RefundPolicy from "./pages/shopping-view/refund-policy";
import ImportantPolicies from "./pages/shopping-view/important-policies";
import ShppingPolicy from "./pages/shopping-view/shipping-policy";
import PaymentPolicy from "./pages/shopping-view/payment-policy";
import Terms from "./pages/shopping-view/terms";
import ContactUs from "./pages/shopping-view/contact";
import { Toaster } from "react-hot-toast";
import ShopMore from "./pages/shopping-view/shop-more";
import AgeVerification from "./pages/shopping-view/age-verification";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-white h-[600px]" />;

  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white">
        <Routes>
          {/* Redirect root path to /age-verification */}
          
          {/* Redirect root path to /age-verification if not authenticated */}
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/shop/home" replace /> : <Navigate to="/age-verification" replace />
            }
          />
          
          {/* Only render AgeVerification if user is not authenticated */}
          <Route
            path="/age-verification"
            element={
              !isAuthenticated ? <AgeVerification /> : <Navigate to="/shop/home" replace />
            }
          />

          {/* Public Routes (No authentication needed) */}
          <Route path="/shop" element={<ShoppingLayout />}>
            <Route path="home" element={<ShoppingHome />} />
            <Route path="listing" element={<ShoppingListing />} />
            <Route path="checkout" element={<ShoppingCheckout />} />
            <Route path="paypal-cancel" element={<PaypalCancelPage />} />
            <Route path="paypal-return" element={<PaypalReturnPage />} />
            <Route path="payment-success" element={<PaymentSuccessPage />} />
            <Route path="search" element={<SearchProducts />} />
            <Route path="policies" element={<Policies />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="shop-more" element={<ShopMore />} />
          </Route>

          {/* Auth routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="important-policies" element={<ImportantPolicies />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="refund-policy" element={<RefundPolicy />} />
          <Route path="shipping-policy" element={<ShppingPolicy />} />
          <Route path="payment-policy" element={<PaymentPolicy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="policies" element={<Policies />} />

          {/* Authenticated Routes (Requires CheckAuth) */}
          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="features" element={<AdminFeatures />} />
          </Route>

          <Route
            path="/shop/account"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingAccount />
              </CheckAuth>
            }
          />

          {/* Unauth page for restricted access */}
          <Route path="/unauth-page" element={<UnauthPage />} />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster 
          position="top-right" 
          reverseOrder={false} 
          toastOptions={{
            style: {
              marginTop: '40px', 
            },
          }} 
        />
      </div>
    </>
  );
}

export default App;
