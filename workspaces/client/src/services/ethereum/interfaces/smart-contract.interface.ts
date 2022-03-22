import { BigNumber } from 'ethers';
import ITransactionData from './transaction.interface';

export default interface ISmartContract {
  name?: () => Promise<string>;

  symbol?: () => Promise<string>;

  numberOfTransactions?: () => Promise<BigNumber>;

  balanceOf?: (account: string) => Promise<BigNumber>;

  getTransactions?: () => Promise<ITransactionData[]>;

  // decimals?: () => Promise<BigNumber>;

  transfer?(payload: {
    source: string;
    destination: string;
    amount: string;
    message: string;
    keyword: string;
  }): Promise<boolean>;

  // allowance?(owner: string, delegate: string): Promise<[BigNumber]>;

  // approve?(delegate: string, amount: BigNumber): Promise<boolean>;

  // totalSupply?(): Promise<[BigNumber]>;

  // transferFrom(owner: string, buyer: string, amount: BigNumber): Promise<boolean>;
}
