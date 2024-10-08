"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Check, Copy, Search } from "lucide-react"
import { useAccount, useReadContract, useWriteContract } from "wagmi"
import { contactManagerABI, contactManagerAddress } from '@/lib/contractinfo'
import { ethers } from "ethers"
import { writeContract } from "viem/actions"

interface Contact {
  name: string
  address: string
}

export default function WalletSideBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [copiedAddress, setCopiedAddress] = useState("")
  const { address } = useAccount()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [contactName, setContactName] = useState('')
  const [contactAddress, setContactAddress] = useState('')
  const { writeContract } = useWriteContract()

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

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (!contactName.trim()) {
      alert('Please enter a name for the contact.')
      return
    }
    
    try {
        writeContract({
            address: contactManagerAddress,
            abi: contactManagerABI,
            functionName: 'addContact',
            args: [`0x${contactName}`, contactAddress],
          });
      // Reset form fields
      setContactName('')
      setContactAddress('')
      // Optionally, display a success message
      console.log("Succesfully added")
    } catch (error) {
      console.error('Error adding contact:', error)
      alert('Failed to add contact.')
    }
  }

  return (
    <TooltipProvider>
      <div className="w-96 h-screen bg-background border-r flex flex-col">
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
        <ScrollArea className="flex-1">
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
            <div className="p-4">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-orange-500 border-2">
              <CardHeader className="border-b border-orange-500/20">
                <CardTitle className="text-xl font-bold text-white text-center">Add New Contact</CardTitle>
              </CardHeader>
              <form onSubmit={handleAddContact}>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <Input
                      placeholder="Enter name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="bg-gradient-to-r from-gray-800 to-gray-700 text-white placeholder-gray-400"
                    />
                    <Input
                      placeholder="Enter address"
                      value={contactAddress}
                      onChange={(e) => setContactAddress(e.target.value)}
                      className="bg-gradient-to-r from-gray-800 to-gray-700 text-white placeholder-gray-400"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    Submit
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
      </div>
    </TooltipProvider>
  )
}