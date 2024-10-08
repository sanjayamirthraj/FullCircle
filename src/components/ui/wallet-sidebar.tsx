"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Check, Copy, Search } from "lucide-react"
import { useAccount, useReadContract } from "wagmi"
import { contactManagerABI, contactManagerAddress } from '@/lib/contractinfo'

interface Contact {
  name: string
  address: string
}

export default function WalletSideBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [copiedAddress, setCopiedAddress] = useState("")
  const { address } = useAccount()
  const [contacts, setContacts] = useState<Contact[]>([])

  const { data: contactsData, isError, isLoading } = useReadContract({
    address: contactManagerAddress,
    abi: contactManagerABI,
    functionName: 'getContacts',
    args: [],
    account: address,
    watch: true,
    enabled: Boolean(address),
  })

  useEffect(() => {
    if (contactsData && Array.isArray(contactsData)) {
      const formattedContacts = contactsData.map((contact: any) => ({
        name: contact.name,
        address: contact.account,
      }))
      .filter((contact) => contact.name && contact.name.trim() !== '')

      const uniqueContacts: Contact[] = []
      const namesSeen = new Set<string>()

      for (const contact of formattedContacts) {
        const nameLowerCase = contact.name.trim().toLowerCase()
        if (!namesSeen.has(nameLowerCase)) {
          namesSeen.add(nameLowerCase)
          uniqueContacts.push(contact)
        }
      }
      
      setContacts(uniqueContacts)
    }
  }, [contactsData])

  const filteredList = contacts.filter(
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
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted">
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
                      className="ml-2 flex-shrink-0"
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