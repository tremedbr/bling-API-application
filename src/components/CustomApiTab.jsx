'use client';

import { useState } from 'react';
import { FiCode, FiSend, FiCopy, FiBook } from 'react-icons/fi';
import { useBlingData } from '../hooks/useBlingData';
import LoadingSpinner, { ErrorMessage, SuccessMessage } from './Common';

export default function CustomApiTab() {
  const { loading, error, useCustomRequest, clearError } = useBlingData();
  const { data, makeRequest } = useCustomRequest();
  
  const [requestData, setRequestData] = useState({
    endpoint: '/me',
    method: 'GET',
    body: '',
    params: ''
  });
  
  const [response, setResponse] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

  const commonEndpoints = [
    { name: 'Informações do usuário', endpoint: '/me' },
    { name: 'Lista de produtos', endpoint: '/produtos' },
    { name: 'Lista de pedidos', endpoint: '/pedidos/vendas' },
    { name: 'Lista de contatos', endpoint: '/contatos' },
    { name: 'Lista de categorias', endpoint: '/categorias/produtos' },
    { name: 'Lista de formas de pagamento', endpoint: '/formas-pagamentos' },
    { name: 'Situações do módulo', endpoint: '/situacoes/modulos' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse(null);
    setSuccessMessage('');
    
    try {
      let bodyData = null;
      let paramsData = {};

      // Parse JSON body if provided
      if (requestData.body.trim()) {
        try {
          bodyData = JSON.parse(requestData.body);
        } catch (parseError) {
          throw new Error('JSON inválido no corpo da requisição');
        }
      }

      // Parse query params if provided
      if (requestData.params.trim()) {
        try {
          paramsData = JSON.parse(requestData.params);
        } catch (parseError) {
          throw new Error('JSON inválido nos parâmetros');
        }
      }

      const result = await makeRequest(
        requestData.endpoint,
        requestData.method,
        bodyData,
        paramsData
      );

      setResponse(result);
      setSuccessMessage('Requisição executada com sucesso!');
    } catch (error) {
      console.error('Erro na requisição personalizada:', error);
    }
  };

  const handleEndpointSelect = (endpoint) => {
    setRequestData(prev => ({
      ...prev,
      endpoint
    }));
  };

  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response, null, 2));
      setSuccessMessage('Resposta copiada para a área de transferência!');
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FiCode className="w-6 h-6 text-bling-primary" />
          <h2 className="text-2xl font-bold text-gray-900">API Personalizada</h2>
        </div>
      </div>

      {/* Endpoints Comuns */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <FiBook className="w-5 h-5 mr-2" />
          Endpoints Comuns
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {commonEndpoints.map((item, index) => (
            <button
              key={index}
              onClick={() => handleEndpointSelect(item.endpoint)}
              className="text-left p-3 rounded-md border border-gray-200 hover:border-bling-primary hover:bg-bling-50 transition-colors"
            >
              <div className="font-medium text-sm text-gray-900">{item.name}</div>
              <div className="text-xs text-gray-500 font-mono">{item.endpoint}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulário de Requisição */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Configurar Requisição</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Method and Endpoint */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Método
                </label>
                <select
                  value={requestData.method}
                  onChange={(e) => setRequestData(prev => ({ ...prev, method: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bling-primary focus:border-transparent"
                >
                  {methods.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>
              
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Endpoint
                </label>
                <input
                  type="text"
                  value={requestData.endpoint}
                  onChange={(e) => setRequestData(prev => ({ ...prev, endpoint: e.target.value }))}
                  placeholder="/endpoint"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bling-primary focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Query Parameters */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parâmetros de Query (JSON)
              </label>
              <textarea
                value={requestData.params}
                onChange={(e) => setRequestData(prev => ({ ...prev, params: e.target.value }))}
                placeholder='{"limite": 10, "pagina": 1}'
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bling-primary focus:border-transparent font-mono text-sm"
              />
            </div>

            {/* Request Body */}
            {(requestData.method === 'POST' || requestData.method === 'PUT' || requestData.method === 'PATCH') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Corpo da Requisição (JSON)
                </label>
                <textarea
                  value={requestData.body}
                  onChange={(e) => setRequestData(prev => ({ ...prev, body: e.target.value }))}
                  placeholder='{"campo": "valor"}'
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bling-primary focus:border-transparent font-mono text-sm"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-bling-primary text-white rounded-md hover:bg-bling-secondary disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <FiSend className="w-4 h-4" />
              )}
              <span>Enviar Requisição</span>
            </button>
          </form>
        </div>

        {/* Resposta */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Resposta</h3>
            {response && (
              <button
                onClick={copyResponse}
                className="flex items-center space-x-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <FiCopy className="w-4 h-4" />
                <span>Copiar</span>
              </button>
            )}
          </div>

          {/* Messages */}
          {error && (
            <ErrorMessage 
              message={error} 
              onClose={clearError} 
              className="mb-4" 
            />
          )}

          {successMessage && (
            <SuccessMessage 
              message={successMessage} 
              onClose={() => setSuccessMessage('')} 
              className="mb-4" 
            />
          )}

          {/* Response Content */}
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : response ? (
            <div className="bg-gray-50 rounded-md p-4 max-h-96 overflow-auto">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-md p-8 text-center">
              <FiCode className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Configure e envie uma requisição para ver a resposta</p>
            </div>
          )}
        </div>
      </div>

      {/* Documentação */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
        <h4 className="text-lg font-medium text-blue-900 mb-2">📚 Documentação</h4>
        <p className="text-blue-800 mb-2">
          Use esta ferramenta para fazer requisições personalizadas para a API do Bling.
        </p>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Todos os endpoints são relativos à base da API: <code>/api/v3</code></li>
          <li>• A autenticação é feita automaticamente usando seu token OAuth</li>
          <li>• Use JSON válido para parâmetros e corpo da requisição</li>
          <li>• Consulte a <a href="https://developer.bling.com.br" target="_blank" rel="noopener noreferrer" className="underline">documentação oficial</a> para endpoints disponíveis</li>
        </ul>
      </div>
    </div>
  );
}
