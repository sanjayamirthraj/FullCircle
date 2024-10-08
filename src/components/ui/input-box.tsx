'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { TiMicrophone } from "react-icons/ti";
import { IoIosPause } from "react-icons/io";
import { useSendTransaction, useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import { walletList } from './wallet-sidebar'
import {ethers} from 'ethers';
import { contactManagerABI, contactManagerAddress } from '@/lib/contractinfo'

const  sendEmail = async () => {
  const whatType = await fetch('/api/send-email/route',{
    method: 'POST',
    headers:  {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ }),
  }).then(response => response.json())
}




declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}




export default function ModernTextInputWithNavbar() {
  const { writeContract } = useWriteContract()

  const [doesnthaveAddress, setdoesntHaveAddress] = useState(false); // State to manage checkbox
  const [phoneNumber, setPhoneNumber] = useState(''); // State for phone number
  // Move the useSendTransaction hook call here
  const { data: hash, sendTransaction } = useSendTransaction();

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    //result if 0,1,2
    //if 1: {address, value}

    const whatType = await fetch('/api/get-transaction-type/route',{
      method: 'POST',
      headers:  {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text }),
    }).then(response => response.json())

    console.log("Whattype:", whatType);

    if (whatType.which === 1 ) {
    const result = await fetch('/api/send-money/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text }),
    }).then(response => response.json());



    const jsonResult = JSON.parse(result.json);
    
    // Check if recipient and amount exist before converting to string
    const recipient = jsonResult.recipient ? jsonResult.recipient.toString() : '';

    
    const recipientAddress = walletList.find(wallet => text.includes(wallet.name))?.address;

    
    if (doesnthaveAddress) {
      let newWallet = ethers.Wallet.createRandom();
      let recipientAddress = newWallet.address;
      let privateKeySend = newWallet.privateKey
      let Generate = newWallet.address.substring(2);

      writeContract({
        address: contactManagerAddress,
        abi: contactManagerABI,
        functionName: 'addContact',
        args: [`0x${Generate}`, recipient],
      });
      sendEmail()
      console.log("New contact registered:", phoneNumber, recipient, "recipientaddy", recipientAddress, "private key", privateKeySend);
      const amount = jsonResult.amount ? jsonResult.amount.toString() : ''; 
      sendTransaction({ to: recipientAddress? recipientAddress : recipient, value: parseEther(amount) });



    }
    else {
      const amount = jsonResult.amount ? jsonResult.amount.toString() : ''; 
      sendTransaction({ to: recipientAddress? recipientAddress : recipient, value: parseEther(amount) });
    }
    
    //sendTransaction({ to: recipientAddress? recipientAddress : recipient, value: parseEther(amount) });
  }
  }

  // State variables to manage recording status, completion, and transcript
const [isRecording, setIsRecording] = useState(false);
const [recordingComplete, setRecordingComplete] = useState(false);
const [transcript, setTranscript] = useState("");

// Reference to store the SpeechRecognition instance
const recognitionRef = useRef<any>(null);

// Function to start recording
const startRecording = () => {
  setIsRecording(true);
  // Create a new SpeechRecognition instance and configure it
  recognitionRef.current = new window.webkitSpeechRecognition();
  recognitionRef.current.continuous = true;
  recognitionRef.current.interimResults = true;

  // Event handler for speech recognition results
  recognitionRef.current.onresult = (event: any) => {
    const { transcript } = event.results[event.results.length - 1][0];

    // Replace "sepulia" with "sepolia" in the transcript
    const updatedTranscript = transcript
      .replace(/sepulia/g, 'sepolia')
      .replace(/\.eat\b/g, '.eth'); // Replace .eat with .eth

    // Log the recognition results and update the transcript state
    console.log(event.results);
    setTranscript(updatedTranscript);
    setText(updatedTranscript); // Update the text state to reflect the updated transcript
  };

  // Start the speech recognition
  recognitionRef.current.start();
};

// Cleanup effect when the component unmounts
useEffect(() => {
  return () => {
    // Stop the speech recognition if it's active
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };
}, []);

// Function to stop recording
const stopRecording = () => {
  if (recognitionRef.current) {
    // Stop the speech recognition and mark recording as complete
    recognitionRef.current.stop();
    setRecordingComplete(true);
  }
};

// Toggle recording state and manage recording actions
const handleToggleRecording = () => {
  setIsRecording(!isRecording);
  if (!isRecording) {
    startRecording();
  } else {
    stopRecording();
  }
};



const [text, setText] = useState('')
const BACKEND_URL="http://localhost:8000"

return (
  <div className="min-h-screen flex flex-col bg-white">      
    <div className="flex-grow flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gradient-to-br from-gray-900 to-black border-orange-500 border-2">
        <CardHeader className="border-b border-orange-500/20">
          <CardTitle className="text-2xl font-bold text-white text-center">Rootstock Voice Transactions</CardTitle>
        </CardHeader>
        <form onSubmit={HandleSubmit}>
          <CardContent className="pt-6">
            <Textarea
              placeholder="Type your message here..."
              value={text} // This will now reflect the updated transcript
              onChange={(e) => setText(e.target.value)}
              className="min-h-[150px] bg-gradient-to-r from-gray-800 to-gray-700 text-white border-orange-500 focus:border-orange-400 focus:ring-orange-400 placeholder-gray-400 transition-all duration-300"
            />
            
            <div className="mt-4 flex items-center"> {/* Added flex to align items */}
              <label className="flex items-center"> {/* Added flex to label for inline alignment */}
                <input 
                  type="checkbox" 
                  checked={doesnthaveAddress} 
                  onChange={() => setdoesntHaveAddress(!doesnthaveAddress)}
                  className='text-white-800'
                />
                <p className='text-white ml-2'>Recipient does not have an address</p> {/* Added margin-left for spacing */}
              </label>
            </div>

            {doesnthaveAddress && ( // Conditionally render the phone number input
              <div className="mt-2">
                <input 
                  type="text" 
                  placeholder="Enter phone number" 
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)} 
                  className="min-h-[40px] bg-gradient-to-r from-gray-800 to-gray-700 text-white border-orange-500 focus:border-orange-400 focus:ring-orange-400 placeholder-gray-400 transition-all duration-300 w-full"
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <button
              className={`mr-2 p-2 text-white rounded-full transition-colors self-end ${isRecording ? 'bg-red-400 hover:bg-red-500' : 'bg-blue-400 hover:bg-blue-500'
                }`}
              onClick={handleToggleRecording}
            >
              {isRecording ? (
                <IoIosPause className='size-6' />
              ) : (
                <TiMicrophone className='size-6' />
              )}
            </button>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
            >
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  </div>
)
}