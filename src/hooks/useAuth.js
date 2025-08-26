'use client';

import { useState, useEffect } from 'react';
import { authService } from '../services/api';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      if (!authService.hasToken()) {
        setLoading(false);
        return;
      }

      const result = await authService.checkAuth();

      if (result.success && result.authenticated) {
        setUser(result.user);
        setAuthenticated(true);
      } else {
        setUser(null);
        setAuthenticated(false);
        authService.logout();
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setUser(null);
      setAuthenticated(false);
      authService.logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    try {
      const result = await authService.initiateAuth();
      if (result.success) {
        window.location.href = result.authUrl;
      }
      return result;
    } catch (error) {
      console.error('Erro ao iniciar login:', error);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setAuthenticated(false);
      window.location.href = '/';
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTokenFromUrl = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (token) {
        authService.saveToken(token);
        // Remove token da URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
        checkAuthStatus();
        return true;
      }
    }
    return false;
  };

  return {
    user,
    loading,
    authenticated,
    login,
    logout,
    checkAuthStatus,
    handleTokenFromUrl,
  };
}
