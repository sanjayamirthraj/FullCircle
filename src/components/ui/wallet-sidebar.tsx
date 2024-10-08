"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Check, Copy, Search } from "lucide-react"

// Sample data for the list
export const walletList = [
    { name: "Sanjay", address: "0xc3Eb0D37362f6F51fC4A741659CC3B83EC96cb9C" },
    { name: "Bob", address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e" },
    { name: "Charlie", address: "0x3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy" },
    { name: "David", address: "0xb794f5ea0ba39494ce839613fffba74279579268" },
  
]

export default function WalletSideBar() {
    const [searchTerm, setSearchTerm] = useState("")
    const [copiedAddress, setCopiedAddress] = useState("")

    const filteredList = walletList.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.address.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const copyToClipboard = (address: string) => {
        navigator.clipboard.writeText(address)
        setCopiedAddress(address)
        setTimeout(() => setCopiedAddress(""), 2000)
    }

    return (
        <TooltipProvider>
            <div className="w-96 h-screen bg-background border-r">
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search names or addresses"
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <ScrollArea className="h-[calc(100vh-73px)]">
                    <div className="p-4 space-y-4">
                        <h2 className="text-lg font-semibold">Saved Addresses</h2>
                        {filteredList.map((item, index) => (
                            <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                                    <p className="text-xs text-muted-foreground truncate">{item.address}</p>
                                </div>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => copyToClipboard(item.address)}
                                            className="flex-shrink-0"
                                        >
                                            {copiedAddress === item.address ? (
                                                <Check className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <Copy className="h-4 w-4" />
                                            )}
                                            <span className="sr-only">Copy address</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{copiedAddress === item.address ? "Copied!" : "Copy address"}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        ))}
                        {filteredList.length === 0 && (
                            <p className="text-center text-muted-foreground">No results found</p>
                        )}
                    </div>
                </ScrollArea>
            </div>
        </TooltipProvider>
    )
}