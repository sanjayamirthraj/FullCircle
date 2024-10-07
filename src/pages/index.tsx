import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import ModernTextInputWithNavbar from '@/components/ui/input-box';
import { useAccount } from 'wagmi'
import { NavigationHeader } from '@/components/ui/NavBar';
import NotSignedIn from '@/components/ui/wallet-sign-in';
import Microphone from '@/components/ui/Microphone';

const Home: NextPage = () => {
  const account = useAccount();

  return (
    <div>
      <NavigationHeader/>
      {account.status === 'connected' ? (
        <ModernTextInputWithNavbar />
      ) : (
        <NotSignedIn />
      )}
    </div>
  );
};

export default Home;
