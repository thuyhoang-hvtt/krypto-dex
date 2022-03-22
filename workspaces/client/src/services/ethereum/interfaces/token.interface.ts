import { BigNumber } from 'ethers';

export default interface ITokenData {
  name: string;
  symbol: string;
  totalSupply: BigNumber;
  numberOfTransactions: number;
}
