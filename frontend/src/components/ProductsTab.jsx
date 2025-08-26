'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiRefreshCw, FiPackage } from 'react-icons/fi';
import { useBlingData } from '../hooks/useBlingData';
import LoadingSpinner, { ErrorMessage } from './Common';

export default function ProductsTab() {
  const { loading, error, useProducts, clearError } = useBlingData();
  const { products, fetchProducts } = useProducts();
  
  const [filters, setFilters] = useState({
    limite: 50,
    pagina: 1,
    criterio: 1,
    tipo: '',
    situacao: 'Ativo'
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      await fetchProducts(filters);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
      pagina: 1 // Reset page when filters change
    }));
  };

  const handleSearch = () => {
    loadProducts();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FiPackage className="w-6 h-6 text-bling-primary" />
          <h2 className="text-2xl font-bold text-gray-900">Produtos</h2>
        </div>
        
        <button
          onClick={loadProducts}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-bling-primary text-white rounded-md hover:bg-bling-secondary disabled:opacity-50 transition-colors"
        >
          <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Atualizar</span>
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Filtros</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Limite por página
            </label>
            <select
              value={filters.limite}
              onChange={(e) => handleFilterChange('limite', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bling-primary focus:border-transparent"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo
            </label>
            <select
              value={filters.tipo}
              onChange={(e) => handleFilterChange('tipo', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bling-primary focus:border-transparent"
            >
              <option value="">Todos</option>
              <option value="P">Produto</option>
              <option value="S">Serviço</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Situação
            </label>
            <select
              value={filters.situacao}
              onChange={(e) => handleFilterChange('situacao', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bling-primary focus:border-transparent"
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
              <option value="">Todos</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-bling-primary text-white rounded-md hover:bg-bling-secondary disabled:opacity-50 transition-colors"
            >
              <FiSearch className="w-4 h-4" />
              <span>Buscar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <ErrorMessage 
          message={error} 
          onClose={clearError} 
          className="mb-6" 
        />
      )}

      {/* Lista de Produtos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {loading ? (
          <div className="p-8">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-center text-gray-600">Carregando produtos...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Código
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Situação
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product, index) => (
                  <tr key={product.id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {product.nome || product.descricao || 'N/A'}
                        </div>
                        {product.descricaoCurta && (
                          <div className="text-sm text-gray-500">
                            {product.descricaoCurta}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.codigo || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.tipo === 'P' ? 'Produto' : product.tipo === 'S' ? 'Serviço' : product.tipo || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        product.situacao === 'Ativo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.situacao || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.preco ? 
                        new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(product.preco) : 'N/A'
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <FiPackage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Nenhum produto encontrado</p>
            <p className="text-sm text-gray-500 mt-1">
              Tente ajustar os filtros ou verifique sua conexão com o Bling
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
