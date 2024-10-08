import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { NavigationHeader } from "@/components/ui/NavBar"

export default function Home() {
  return (
    <div>
      
      <NavigationHeader/>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white to-orange-500">
        <Card className="w-full max-w-3xl bg-gradient-to-r p-6 rounded-lg shadow-lg">
          <CardHeader>
            <CardTitle>How to Use FullCircle</CardTitle>
            <CardDescription>Learn how to make the most of FullCircle's innovative features</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>1. Intent Recognition for On-Chain Transactions</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">FullCircle uses natural language processing to simplify blockchain transactions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Type or speak your transaction intent in everyday language.</li>
                    <li>Example: "Send 0.5 rBTC to Sarah for rent" or "Pay 0x60d6252fC31177B48732ab89f073407788F09C61 .001 'tesnet root stock'"</li>
                    <li>FullCircle will interpret your intent and initiate the appropriate transaction.</li>
                    <li>Verify the transaction details before confirming.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>2. Seamless Wallet Creation & Fund Transfer via Email</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">Send cryptocurrency to anyone, even if they don't have a wallet:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Enter the recipient's email address when initiating a transaction.</li>
                    <li>Check the "Recipient does not have an address" box if applicable.</li>
                    <li>FullCircle will generate a secure wallet for the recipient.</li>
                    <li>The recipient will receive their private key and wallet address via encrypted email.</li>
                    <li>For future transactions, the recipient's wallet address will be saved and associated with their email.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
    </div>
       </div>
  )
}