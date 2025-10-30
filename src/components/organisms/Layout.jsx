import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

const Layout = () => {
  const authContext = useAuth();
  const cartContext = useCart();
  const wishlistContext = useWishlist();

  const outletContext = {
    user: authContext.user,
    logout: authContext.logout,
    cart: cartContext.cart,
    addToCart: cartContext.addToCart,
    removeFromCart: cartContext.removeFromCart,
    updateQuantity: cartContext.updateQuantity,
    clearCart: cartContext.clearCart,
    getCartTotal: cartContext.getCartTotal,
    wishlist: wishlistContext.wishlist,
    addToWishlist: wishlistContext.addToWishlist,
    removeFromWishlist: wishlistContext.removeFromWishlist,
    toggleWishlist: wishlistContext.toggleWishlist,
    isInWishlist: wishlistContext.isInWishlist
  };

return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header 
          cart={cartContext.cart}
          wishlist={wishlistContext.wishlist}
          user={authContext.user}
          logout={authContext.logout}
        />
        <main className="flex-1">
          <Outlet context={outletContext} />
        </main>
        <Footer />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </>
  );
};

export default Layout;