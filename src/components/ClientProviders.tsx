'use client';

import { WishlistProvider } from '../contexts/WishlistContext';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <WishlistProvider>
      {children}
    </WishlistProvider>
  );
}