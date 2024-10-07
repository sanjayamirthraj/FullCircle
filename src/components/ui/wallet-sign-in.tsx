import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { WalletIcon } from "lucide-react"

export default function NotSignedIn() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Alert className="max-w-md w-full">
        <WalletIcon className="h-4 w-4" />
        <AlertTitle>Connect Your Wallet</AlertTitle>
        <AlertDescription className="mt-3">
          Please sign in to your wallet to access your account and make transactions.
        </AlertDescription>
          <div><ConnectButton/></div>
      </Alert>
    </div>
  )
}