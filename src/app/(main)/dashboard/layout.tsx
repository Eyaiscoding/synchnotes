import { SubscriptionModalProvider } from '@/lib/providers/subscription-modal-provider';
import { getActiveProductsWithPrice } from '@/lib/supabase/queries';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  params: any;
}

const Layout: React.FC<LayoutProps> = async ({ children, params }) => {
  const { data: products, error } = await getActiveProductsWithPrice();
  if (error) {
    let errorMessage = "Error fetching products.";
    // Check if error object has a message property
    if (error && typeof error === 'object' && 'message' in error) {
      errorMessage += " " + error.message;
    }
    throw new Error(errorMessage);
  }
  return (
    <main className="flex over-hidden h-screen">
      <SubscriptionModalProvider products={products}>
        {children}
      </SubscriptionModalProvider>
    </main>
  );
};

export default Layout;