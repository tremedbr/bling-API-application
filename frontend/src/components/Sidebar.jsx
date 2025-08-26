'use client';

import { useState } from 'react';
import { FiPackage, FiShoppingCart, FiUsers, FiCode, FiRefreshCw } from 'react-icons/fi';

export default function Sidebar({ activeTab, onTabChange }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const tabs = [
    {
      id: 'products',
      name: 'Produtos',
      icon: FiPackage,
      description: 'Gerenciar produtos'
    },
    {
      id: 'orders',
      name: 'Pedidos',
      icon: FiShoppingCart,
      description: 'Visualizar pedidos'
    },
    {
      id: 'contacts',
      name: 'Contatos',
      icon: FiUsers,
      description: 'Gerenciar contatos'
    },
    {
      id: 'custom',
      name: 'API Custom',
      icon: FiCode,
      description: 'Requisições personalizadas'
    }
  ];

  return (
    <div className={`bg-white shadow-sm border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
        >
          <FiRefreshCw className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <nav className="mt-4">
        <div className="px-2 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-bling-primary text-white'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
                title={isCollapsed ? tab.name : ''}
              >
                <Icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
                {!isCollapsed && (
                  <div className="text-left">
                    <div>{tab.name}</div>
                    {!isActive && (
                      <div className="text-xs text-gray-500">{tab.description}</div>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
