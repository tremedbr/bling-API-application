'use client';

import { useEffect } from 'react';
import { FiAlertCircle, FiHome } from 'react-icons/fi';

export default function AuthErrorPage() {
  useEffect(() => {
    // Clear any stored tokens on error
    localStorage.removeItem('bling_token');
  }, []);

  const getErrorMessage = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return (
        urlParams.get('message') || 'Erro desconhecido durante a autenticação'
      );
    }
    return 'Erro durante a autenticação';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-lg sm:px-8">
          <div className="text-center">
            <FiAlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Erro de Autenticação
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <p className="text-red-800 text-sm">
                {decodeURIComponent(getErrorMessage())}
              </p>
            </div>
            <p className="text-gray-600 mb-6">
              Ocorreu um erro durante o processo de autenticação com o Bling.
              Tente novamente ou entre em contato com o suporte se o problema
              persistir.
            </p>
            <button
              onClick={() => (window.location.href = '/')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-bling-primary hover:bg-bling-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bling-primary"
            >
              <FiHome className="mr-2 h-4 w-4" />
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
