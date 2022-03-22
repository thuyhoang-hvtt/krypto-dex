import React, { useCallback, useEffect, useState } from 'react';
import { useAccount, useMetaMask, useSmartContract } from '@/context/smart-contract.context';

export default function useHooks() {
  const [tokenName, setTokenName] = useState('');
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ addressTo: '', amount: '0', keyword: '', message: '' });
  const { walletAddress = '' } = useAccount();
  const { connectToMetaMask } = useMetaMask();
  const contract = useSmartContract();

  const _getTokenName = async () => {
    const name = await contract.name?.();
    setTokenName(name || '');
  };

  const _clearForm = () => setForm({ addressTo: '', amount: '0', keyword: '', message: '' });

  useEffect(() => {
    if (walletAddress && contract) {
      setConnected(walletAddress !== '');
      _getTokenName();
    } else {
      setConnected(false);
      setTokenName('');
      _clearForm();
    }
  }, [walletAddress, contract]);

  const handleConnectWallet = useCallback(async () => {
    if (connectToMetaMask === undefined) {
      alert('Please install MetaMask!!!');
      return;
    }
    setLoading(true);
    await connectToMetaMask();
    setLoading(false);
  }, [connectToMetaMask, setLoading]);

  const handleTransferToken = useCallback(async () => {
    if (contract.transfer === undefined) {
      alert('Please install MetaMask!!!');
      return;
    }
    setLoading(true);
    await contract.transfer({
      source: walletAddress,
      destination: form.addressTo,
      amount: form.amount,
      message: form.message,
      keyword: form.keyword,
    });
    setLoading(false);
  }, [setLoading, contract, form, walletAddress]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, target: string) => {
      setForm((draft) => ({
        ...draft,
        [target]: event.target.value,
      }));
    },
    [setForm]
  );

  return {
    state: {
      walletAddress,
      connected,
      loading,
      form,
      tokenName,
    },
    handler: {
      handleConnectWallet,
      handleInputChange,
      handleTransferToken,
    },
    contract,
  };
}
