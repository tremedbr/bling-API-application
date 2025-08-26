'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import ProductsTab from '../../components/ProductsTab';
import OrdersTab from '../../components/OrdersTab';
import ContactsTab from '../../components/ContactsTab';
import CustomApiTab from '../../components/CustomApiTab';
import { FullPageLoader } from '../../components/Common';

export default function DashboardPage() {
  const { user, loading, authenticated, handleTokenFromUrl } = useAuth();
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    // Handle token from URL if present
    const hasToken = handleTokenFromUrl();
    if (!hasToken && !authenticated && !loading) {
      // Redirect to home if not authenticated
      window.location.href = '/';
    }
  }, [authenticated, loading]);

  if (loading) {
    return <FullPageLoader />;
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Acesso não autorizado
          </h2>
          <p className="text-gray-600 mb-4">
            Você precisa estar autenticado para acessar esta página.
          </p>
          <button
            onClick={() => (window.location.href = '/')}
            className="px-4 py-2 bg-bling-primary text-white rounded-md hover:bg-bling-secondary transition-colors"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductsTab />;
      case 'orders':
        return <OrdersTab />;
      case 'contacts':
        return <ContactsTab />;
      case 'custom':
        return <CustomApiTab />;
      default:
        return <ProductsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-1 overflow-auto">{renderTabContent()}</main>
      </div>
    </div>
  );
}
