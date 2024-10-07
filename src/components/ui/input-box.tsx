'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import Link from 'next/link'
import { NavigationHeader } from './NavBar'

export default function ModernTextInputWithNavbar() {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Transaction text:', text)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">      
      <div className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gradient-to-br from-gray-900 to-black border-orange-500 border-2">
          <CardHeader className="border-b border-orange-500/20">
            <CardTitle className="text-2xl font-bold text-white text-center">Share Your Thoughts</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6">
              <Textarea
                placeholder="Type your message here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[150px] bg-gradient-to-r from-gray-800 to-gray-700 text-white border-orange-500 focus:border-orange-400 focus:ring-orange-400 placeholder-gray-400 transition-all duration-300"
              />
            </CardContent>
            <CardFooter>
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