import { BigNumber } from 'ethers';

export default interface ITransactionData {
  source: string;
  destination: string;
  amount: BigNumber;
  message: string;
  timestamp: BigNumber;
  keyword: string;
}
