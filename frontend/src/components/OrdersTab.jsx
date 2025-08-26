'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiRefreshCw, FiShoppingCart, FiCalendar } from 'react-icons/fi';
import { useBlingData } from '../hooks/useBlingData';
import LoadingSpinner, { ErrorMessage } from './Common';

export default function OrdersTab() {
  const { loading, error, useOrders, clearError } = useBlingData();
  const { orders, fetchOrders } = useOrders();
  
  const [filters, setFilters] = useState({
    limite: 50,
    pagina: 1,
    dataInicial: '',
    dataFinal: '',
    situacao: ''
  });

  useEffect(() => {
    // Set default date range (last 30 days)
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
    
    setFilters(prev => ({
      ...prev,
      dataInicial: thirtyDaysAgo.toISOString().split('T')[0],
      dataFinal: today.toISOString().split('T')[0]
    }));
  }, []);

  useEffect(() => {
    if (filters.dataInicial && filters.dataFinal) {
      loadOrders();
    }
  }, [filters.dataInicial, filters.dataFinal]);

  const loadOrders = async () => {
    try {
      await fetchOrders(filters);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
      pagina: 1
    }));
  };

  const handleSearch = () => {
    loadOrders();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('pt-BR');
    } catch {
      return 'N/A';
    }
  };

  const formatCurrency = (value) => {
    if (!value) return 'N/A';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FiShoppingCart className="w-6 h-6 text-bling-primary" />
          <h2 className="text-2xl font-bold text-gray-900">Pedidos</h2>
        </div>
        
        <button
          onClick={loadOrders}
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data Inicial
            </label>
            <input
              type="date"
              value={filters.dataInicial}
              onChange={(e) => handleFilterChange('dataInicial', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bling-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data Final
            </label>
            <input
              type="date"
              value={filters.dataFinal}
              onChange={(e) => handleFilterChange('dataFinal', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bling-primary focus:border-transparent"
            />
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
              <option value="">Todas</option>
              <option value="Em aberto">Em aberto</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Atendido">Atendido</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Limite
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

      {/* Lista de Pedidos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {loading ? (
          <div className="p-8">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-center text-gray-600">Carregando pedidos...</p>
          </div>
        ) : orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Número
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Situação
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order, index) => (
                  <tr key={order.id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.numero || order.id || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <FiCalendar className="w-4 h-4 text-gray-400 mr-2" />
                        {formatDate(order.data || order.dataVenda)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.contato?.nome || order.cliente?.nome || 'N/A'}
                        </div>
                        {order.contato?.email && (
                          <div className="text-sm text-gray-500">
                            {order.contato.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.situacao === 'Atendido' ? 'bg-green-100 text-green-800' :
                        order.situacao === 'Em andamento' ? 'bg-yellow-100 text-yellow-800' :
                        order.situacao === 'Cancelado' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {order.situacao || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(order.total || order.valorTotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <FiShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Nenhum pedido encontrado</p>
            <p className="text-sm text-gray-500 mt-1">
              Tente ajustar os filtros ou verifique sua conexão com o Bling
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
