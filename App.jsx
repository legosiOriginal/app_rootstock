import React, { useState } from 'react';
import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { motion } from 'framer-motion';
import { ethers } from 'ethers';
import './App.css';

// Dirección del contrato inteligente (debe ser la misma que en el .env)
const CONTRACT_ADDRESS = import.meta.env.VITE_APP_CONTRACT_ADDRESS;

// ABI del contrato inteligente (aquí debes añadir la ABI de tu contrato)
const CONTRACT_ABI = [
  // ABI del contrato inteligente
  "function batchTokens(address[] memory tokens, uint256[] memory amounts) public",
  "event TokensBatchSent(address indexed user, uint256 totalAmount)"
];

function WalletBalances() {
  const { address, isConnected } = useAccount();
  const { data: balance, isLoading } = useBalance({ address });
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  // Inicializar ethers.js
  React.useEffect(() => {
    if (isConnected) {
      const newProvider = new ethers.providers.JsonRpcProvider(import.meta.env.VITE_APP_NETWORK_URL);
      setProvider(newProvider);

      const newContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, newProvider.getSigner());
      setContract(newContract);
    }
  }, [isConnected]);

  const sendBatch = async () => {
    if (!contract || !provider) {
      console.error('Contract or provider is not initialized');
      return;
    }

    try {
      const tokens = balance.map(token => token.address);
      const amounts = balance.map(token => ethers.utils.parseUnits(token.formatted, token.decimals));
      const tx = await contract.batchTokens(tokens, amounts);
      await tx.wait();
      console.log('Batch transaction successful');
    } catch (error) {
      console.error('Error sending batch:', error);
    }
  };

  if (!isConnected) return <div>Conecta tu wallet para ver los saldos</div>;

  if (isLoading) return <div>Cargando saldos...</div>;

  return (
    <div>
      <h3>Saldos disponibles:</h3>
      <ul>
        {balance.map((token) => (
          <li key={token.address}>
            {token.symbol}: {token.formatted}
            <button onClick={() => {/* Lógica para seleccionar el token */}}>Seleccionar</button>
          </li>
        ))}
      </ul>
      <button onClick={sendBatch}>Enviar tokens al pool</button>
    </div>
  );
}

export default function App() {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();

  return (
    <div>
      <h1>App Rootstock funcionando</h1>
      {isConnected ? (
        <>
          <button onClick={() => disconnect()}>Desconectar Wallet</button>
          <WalletBalances />
        </>
      ) : (
        <button onClick={() => connect()}>Conectar Wallet</button>
      )}
    </div>
  );
}