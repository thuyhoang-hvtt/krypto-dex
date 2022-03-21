import { Token } from '@krypto/core/typechain-types';
import { ethers } from 'ethers';
import ISmartContract from './interfaces/smart-contract.interface';
import ITransactionData from './interfaces/transaction.interface';

class SmartContract implements ISmartContract {
  private abiAddress: string;

  private instance: Token;

  private provider?: ethers.providers.Web3Provider;

  constructor(
    address: string,
    abi: ethers.ContractInterface,
    provider?: ethers.providers.Web3Provider
  ) {
    this.abiAddress = address;
    this.instance = new ethers.Contract(address, abi, provider) as Token;
    this.provider = provider;
  }

  async name(): Promise<string> {
    return this.instance.name();
  }

  async symbol(): Promise<string> {
    return this.instance.symbol();
  }

  async balanceOf(account: string): Promise<ethers.BigNumber> {
    return this.instance.balanceOf(account);
  }

  async numberOfTransactions(): Promise<ethers.BigNumber> {
    return this.instance.numberOfTransactions();
  }

  async getTransactions(): Promise<ITransactionData[]> {
    return this.instance.getTransactions();
  }

  async transfer(payload: {
    source: string;
    destination: string;
    amount: string;
    message: string;
    keyword: string;
  }): Promise<boolean> {
    const { source, destination, amount, message, keyword } = payload;
    try {
      if (source === '' || this.provider === undefined) {
        throw Error('Please connect to MetaMask to make a transaction.');
      }

      if (source === destination) {
        throw Error('Please tell me how I can transfer to my self.');
      }

      const decimals = await this.instance.decimals();
      const sourceBalance = await this.instance.balanceOf(source);
      const parsedAmount = ethers.utils.parseUnits(amount, decimals);

      if (sourceBalance.lt(parsedAmount)) {
        throw Error('Too Greedy! Tham Lam :)');
      }

      const signer = this.provider.getSigner();

      const txData = this.instance.interface.encodeFunctionData('transfer', [
        destination,
        parsedAmount,
        message,
        keyword,
      ]);

      const tx = await signer.sendTransaction({ to: this.abiAddress, data: txData });
      await tx.wait();

      /* ------ Send transaction to send ETH -------
      // get a signer wallet!
      const signer = this.provider.getSigner();

      // Get nonce
      const txNonce = await this.provider.getTransactionCount(source, 'latest');

      // Get gas price
      const txGasPrice = await this.provider.getGasPrice();

      // Creating a transaction param
      const txParams = {
        from: source,
        to: destination,
        value: parsedAmount._hex,
        nonce: txNonce,
        gasLimit: ethers.utils.hexlify(21000),
        gasPrice: ethers.utils.hexlify(parseInt(txGasPrice.toString(), 10)),
      };

      const tx = await signer.sendTransaction(txParams);
      await tx.wait();
      */

      alert('Completed transaction successfully!');
    } catch (exception: any) {
      alert(exception.message);
      return false;
    }
    return true;
  }
}

export default SmartContract;
