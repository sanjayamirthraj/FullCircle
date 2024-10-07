import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import ModernTextInputWithNavbar from '@/components/ui/input-box';
import { useAccount } from 'wagmi'
import { NavigationHeader } from '@/components/ui/NavBar';

const Home: NextPage = () => {
  const account = useAccount();

  return (
    <div>
      <NavigationHeader/>

      {account.status === 'connected' ? (
        <ModernTextInputWithNavbar />
      ) : (
        <div>Connect</div>
      )}
    </div>
  );
};

export default Home;
