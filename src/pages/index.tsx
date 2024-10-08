import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import ModernTextInputWithNavbar from '@/components/ui/input-box';
import { useAccount } from 'wagmi'
import { NavigationHeader } from '@/components/ui/NavBar';
import NotSignedIn from '@/components/ui/wallet-sign-in';
import Microphone from '@/components/ui/Microphone';
import WalletSideBar from '@/components/ui/wallet-sidebar';

const Home: NextPage = () => {
  const account = useAccount();

  return (
    <div>
      <NavigationHeader/>
     
      {account.status === 'connected' ? (
         <div className="flex">
           <WalletSideBar/>
           <div className="flex-grow">
             <ModernTextInputWithNavbar />
           </div>
         </div>
      ) : (
        <NotSignedIn />
      )}
    </div>
  );
};

export default Home;
