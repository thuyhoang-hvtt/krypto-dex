import React from 'react';
import { abi } from '@krypto/core/artifacts/contracts/Token.sol/Token.json';
import ISmartContract from '@/services/ethereum/interfaces/smart-contract.interface';
import useEthers from '@/hooks/use-ethers';
import IMetaMask from '@/services/ethereum/interfaces/metamask.interface';
import IAccount from '@/services/ethereum/interfaces/account.interface';

const contractAddress = import.meta.env.VITE_SMART_CONTRACT_ADDRESS;

const AccountContext = React.createContext<IAccount>({});
const MetaMaskContext = React.createContext<IMetaMask>({});
const SmartContractContext = React.createContext<ISmartContract>({});

interface ISmartContractContextProvider {
  children: React.ReactNode;
}

const SmartContractContextProvider: React.FC<ISmartContractContextProvider> = (props) => {
  const { children } = props;
  const { walletAddress, metaMask, contract } = useEthers(contractAddress, abi);

  React.useEffect(() => {
    if (window.ethereum === undefined) {
      alert('Please install MetaMask to playground all features!');
    }
  }, []);

  return (
    <SmartContractContext.Provider value={contract}>
      <MetaMaskContext.Provider value={metaMask}>
        <AccountContext.Provider value={walletAddress}>{children}</AccountContext.Provider>
      </MetaMaskContext.Provider>
    </SmartContractContext.Provider>
  );
};

function useSmartContract() {
  return React.useContext(SmartContractContext);
}

function useMetaMask() {
  return React.useContext(MetaMaskContext);
}

function useAccount() {
  return React.useContext(AccountContext);
}

export { SmartContractContextProvider, useSmartContract, useMetaMask, useAccount };
