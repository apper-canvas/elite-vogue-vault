import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/organisms/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";

// Lazy load all page components
const HomePage = lazy(() => import("@/components/pages/HomePage"));
const CategoryPage = lazy(() => import("@/components/pages/CategoryPage"));
const ProductDetailPage = lazy(() => import("@/components/pages/ProductDetailPage"));
const CartPage = lazy(() => import("@/components/pages/CartPage"));
const CheckoutPage = lazy(() => import("@/components/pages/CheckoutPage"));
const WishlistPage = lazy(() => import("@/components/pages/WishlistPage"));
const LoginPage = lazy(() => import("@/components/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/components/pages/RegisterPage"));
const AccountPage = lazy(() => import("@/components/pages/AccountPage"));
const OrderHistoryPage = lazy(() => import("@/components/pages/OrderHistoryPage"));
const ProfilePage = lazy(() => import("@/components/pages/ProfilePage"));
const NotFound = lazy(() => import("@/components/pages/NotFound"));

// Suspense fallback component
const SuspenseLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center space-y-4">
      <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  </div>
);

// Main routes configuration
const mainRoutes = [
  {
    path: "",
    index: true,
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <HomePage />
      </Suspense>
    )
  },
  {
    path: "category/:category",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <CategoryPage />
      </Suspense>
    )
  },
  {
    path: "product/:id",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <ProductDetailPage />
      </Suspense>
    )
  },
  {
    path: "cart",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <CartPage />
      </Suspense>
    )
  },
  {
    path: "checkout",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <CheckoutPage />
      </Suspense>
    )
  },
  {
    path: "wishlist",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <WishlistPage />
      </Suspense>
    )
  },
  {
    path: "login",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <LoginPage />
      </Suspense>
    )
  },
  {
    path: "register",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <RegisterPage />
      </Suspense>
    )
  },
  {
    path: "account",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <ProtectedRoute>
          <AccountPage />
        </ProtectedRoute>
      </Suspense>
    )
  },
  {
    path: "orders",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <ProtectedRoute>
          <OrderHistoryPage />
        </ProtectedRoute>
      </Suspense>
    )
  },
  {
    path: "profile",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      </Suspense>
    )
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <NotFound />
      </Suspense>
    )
  }
];

// Router configuration
const routes = [
  {
    path: "/",
    element: <Layout />,
    children: mainRoutes
  }
];

export const router = createBrowserRouter(routes);