'use client';

import { FiLoader, FiX } from 'react-icons/fi';

export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <FiLoader className={`animate-spin ${sizeClasses[size]} text-bling-primary`} />
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <div className="text-center">
        <LoadingSpinner size="xl" />
        <p className="mt-2 text-gray-600">Carregando...</p>
      </div>
    </div>
  );
}

export function ErrorMessage({ message, onClose, className = '' }) {
  if (!message) return null;

  return (
    <div className={`bg-red-50 border border-red-200 rounded-md p-4 ${className}`}>
      <div className="flex items-start">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">Erro</h3>
          <p className="mt-1 text-sm text-red-600">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-red-400 hover:text-red-600"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export function SuccessMessage({ message, onClose, className = '' }) {
  if (!message) return null;

  return (
    <div className={`bg-green-50 border border-green-200 rounded-md p-4 ${className}`}>
      <div className="flex items-start">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-green-800">Sucesso</h3>
          <p className="mt-1 text-sm text-green-600">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-green-400 hover:text-green-600"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
