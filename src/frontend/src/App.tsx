import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartDrawer } from "./components/CartDrawer";
import { CommitmentStrip } from "./components/CommitmentStrip";
import { EditorialSection } from "./components/EditorialSection";
import { FeaturedCollections } from "./components/FeaturedCollections";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { NewArrivalsSection } from "./components/NewArrivalsSection";
import { CartProvider } from "./context/CartContext";
import { AdminPage } from "./pages/AdminPage";

const queryClient = new QueryClient();

function RocherApp() {
  const isAdmin = window.location.hash === "#/admin";

  if (isAdmin) {
    return (
      <>
        <AdminPage />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      <main>
        <HeroSection />
        <NewArrivalsSection />
        <CommitmentStrip />
        <FeaturedCollections />
        <EditorialSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <RocherApp />
      </CartProvider>
    </QueryClientProvider>
  );
}
