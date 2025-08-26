'use client';

import { useState, useCallback } from 'react';
import { blingService } from '../services/api';

export function useBlingData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeRequest = useCallback(async (requestFn) => {
    setLoading(true);
    setError(null);

    try {
      const result = await requestFn();
      return result;
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || err.message || 'Erro desconhecido';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Hook para produtos
  const useProducts = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = useCallback(
      async (filters = {}) => {
        const result = await executeRequest(() =>
          blingService.getProducts(filters)
        );
        if (result.success) {
          setProducts(result.data.data || []);
        }
        return result;
      },
      [executeRequest]
    );

    return { products, fetchProducts };
  };

  // Hook para pedidos
  const useOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = useCallback(
      async (filters = {}) => {
        const result = await executeRequest(() =>
          blingService.getOrders(filters)
        );
        if (result.success) {
          setOrders(result.data.data || []);
        }
        return result;
      },
      [executeRequest]
    );

    return { orders, fetchOrders };
  };

  // Hook para contatos
  const useContacts = () => {
    const [contacts, setContacts] = useState([]);

    const fetchContacts = useCallback(
      async (filters = {}) => {
        const result = await executeRequest(() =>
          blingService.getContacts(filters)
        );
        if (result.success) {
          setContacts(result.data.data || []);
        }
        return result;
      },
      [executeRequest]
    );

    return { contacts, fetchContacts };
  };

  // Hook para requisições personalizadas
  const useCustomRequest = () => {
    const [data, setData] = useState(null);

    const makeRequest = useCallback(
      async (endpoint, method = 'GET', requestData = null, params = {}) => {
        const result = await executeRequest(() =>
          blingService.customRequest(endpoint, method, requestData, params)
        );
        if (result.success) {
          setData(result.data);
        }
        return result;
      },
      [executeRequest]
    );

    return { data, makeRequest };
  };

  return {
    loading,
    error,
    useProducts,
    useOrders,
    useContacts,
    useCustomRequest,
    clearError: () => setError(null),
  };
}
