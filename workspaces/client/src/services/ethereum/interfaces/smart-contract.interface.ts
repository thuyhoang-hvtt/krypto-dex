import { BigNumber } from 'ethers';
import ITransactionData from './transaction.interface';

export default interface ISmartContract {
  name?: () => Promise<string>;
  symbol?: () => Promise<string>;
  numberOfTransactions?: () => Promise<BigNumber>;
  balanceOf?: (account: string) => Promise<BigNumber>;
  getTransactions?: () => Promise<ITransactionData[]>;
  transfer?: (payload: {
    source: string;
    destination: string;
    amount: string;
    message: string;
    keyword: string;
  }) => Promise<boolean>;
}
