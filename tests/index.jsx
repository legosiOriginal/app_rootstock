import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { WagmiConfig, createClient } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const client = createClient({
  autoConnect: true,
  connectors: () => [
    new InjectedConnector({ chains: [] }), // Configurar si es necesario
  ],
  provider: ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  ),
});

ReactDOM.render(
  <WagmiConfig client={client}>
    <App />
  </WagmiConfig>,
  document.getElementById('root')
);