import { InjectedConnector } from 'wagmi/connectors/injected';
import { motion } from 'framer-motion';
import './App.css';

function WalletBalances() {
  const { address, isConnected } = useAccount();
  const { data: balance, isLoading } = useBalance({ address });

  if (!isConnected) return <div>Conecta tu wallet para ver los saldos</div>;

  if (isLoading) return <div>Cargando saldos...</div>;

  return (
    <div>
      <h3>Saldos disponibles:</h3>
      <ul>
        {balance.map((token) => (
          <li key={token.address}>
            {token.symbol}: {token.formatted}
            <button>Seleccionar</button>
          </li>
        ))}
      </ul>
      <button onClick={sendBatch}>Enviar tokens al pool</button>
    </div>
  );
}

async function sendBatch() {
  // Lógica para batch y envío de transacciones al smart contract
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
