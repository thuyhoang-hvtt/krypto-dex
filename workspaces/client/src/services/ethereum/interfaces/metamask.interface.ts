export default interface IMetaMask {
  connectToMetaMask?: () => Promise<void>;
  disconnectFromMetaMask?: () => Promise<void>;
}
