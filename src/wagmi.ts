import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {

  rootstockTestnet,
  sepolia
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    rootstockTestnet,
    sepolia
  ],
  ssr: true,
});