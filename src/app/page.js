'use client';

import { useState } from 'react';
import { FiLogIn, FiShield, FiZap, FiCheck } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner, { FullPageLoader } from '../components/Common';

export default function HomePage() {
  const { login, loading } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await login();
    } catch (error) {
      console.error('Erro ao iniciar login:', error);
      setIsLoggingIn(false);
    }
  };

  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bling-primary to-bling-secondary">
      <div className="flex flex-col justify-center min-h-screen py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo/Header */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <FiZap className="h-8 w-8 text-bling-primary" />
            </div>
            <h1 className="mt-6 text-center text-3xl font-extrabold text-white">
              Integração Bling
            </h1>
            <p className="mt-2 text-center text-sm text-blue-100">
              Conecte-se com a API do Bling via OAuth
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow-xl rounded-lg sm:px-8">
            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                O que você pode fazer:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-sm text-gray-700">
                    Listar produtos e serviços
                  </span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-sm text-gray-700">
                    Consultar pedidos de venda
                  </span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-sm text-gray-700">
                    Gerenciar contatos
                  </span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-sm text-gray-700">
                    Requisições personalizadas
                  </span>
                </li>
              </ul>
            </div>

            {/* Login Button */}
            <div>
              <button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-bling-primary hover:bg-bling-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bling-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {isLoggingIn ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <FiLogIn className="h-5 w-5 text-bling-accent group-hover:text-blue-100" />
                  )}
                </span>
                {isLoggingIn ? 'Conectando...' : 'Conectar com Bling'}
              </button>
            </div>

            {/* Security Notice */}
            <div className="mt-6">
              <div className="bg-gray-50 rounded-md p-4">
                <div className="flex">
                  <FiShield className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Conexão Segura
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Utilizamos OAuth 2.0 para garantir a segurança dos seus
                      dados. Você será redirecionado para o Bling para autorizar
                      o acesso.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-blue-100">
            Desenvolvido para integração com a API do Bling v3
          </p>
        </div>
      </div>
    </div>
  );
}
