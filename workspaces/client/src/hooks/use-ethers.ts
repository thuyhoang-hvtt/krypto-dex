import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import SmartContract from '@/services/ethereum/smart-contract.service';

const useEthers = (address: string, abi: ethers.ContractInterface) => {
  if (window.ethereum === undefined) {
    return { walletAddress: {}, metaMask: {}, contract: {} };
  }

  const [account, setAccount] = useState<string>('');

  const provider = useMemo(
    () => new ethers.providers.Web3Provider(window.ethereum),
    [window.ethereum]
  );

  const walletAddress = useMemo(() => ({ walletAddress: account }), [account]);

  const metaMask = useMemo(
    () => ({
      connectToMetaMask: async () => {
        try {
          const accounts = await provider.send('eth_requestAccounts', []);
          setAccount(accounts.length ? accounts[0] : '');

          const tokenAddress = address;
          const tokenSymbol = 'TMI';
          const tokenDecimals = 11;

          // wasAdded is a boolean. Like any RPC method, an error may be thrown.
          await window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20', // Initially only supports ERC20, but eventually more!
              options: {
                address: tokenAddress, // The address that the token is at.
                symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                decimals: tokenDecimals, // The number of decimals in the token
              },
            },
          });
        } catch (error: any) {
          alert(error.message);
        }
      },
      disconnectFromMetaMask: async () => {
        setAccount('');
      },
    }),
    [window.ethereum]
  );

  const contract = useMemo(
    () => new SmartContract(address, abi, provider),
    [address, abi, provider]
  );

  useEffect(() => {
    const accountsChangedCallback = (selectedAccounts: string[]): void => {
      setAccount(selectedAccounts.length ? selectedAccounts[0] : '');
    };

    window.ethereum.addListener('accountsChanged', accountsChangedCallback);

    return () => window.ethereum.removeListener('accountsChanged', accountsChangedCallback);
  }, [provider, window.ethereum]);

  return { contract, provider, walletAddress, metaMask };
};

export default useEthers;
