/// <reference types="vite/client" />
interface Window {
  ethereum: any;
}

interface ImportMetaEnv {
  readonly VITE_SMART_CONTRACT_ADDRESS: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
