Here’s an updated and more specific README for your project:

---

# FullCircle: An All-In-One Payment Platform for Easy Crypto Onboarding

 **FullCircle** simplifies crypto transactions by offering two key features: natural language transaction intent recognition and secure wallet creation for recipients without a crypto wallet.

## Core Features

1. **Intent Recognition for On-Chain Transactions**  
   Users can input their transaction intent via natural language (written or spoken) and FullCircle automatically converts this into an on-chain transaction, making crypto payments as simple as stating your intent.

2. **Send Funds to Non-Wallet Holders**  
   If the recipient doesn’t have a crypto wallet, users can send funds via their email. FullCircle will generate a wallet address and private key for the recipient, securely transmitting the information over Mailgun’s SMTP server.

## Getting Started

To run the project locally, ensure your environment is properly configured.

### Prerequisites

You will need to set up a `.env.local` file with the following keys:

- **OpenAI API Key** (`OPENAI_API_KEY`)
- **Mailgun API Key** (`MAILGUN_API_KEY`)

### Development Server

To start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app. 

### Environment Variables

Make sure your `.env.local` file includes the following:

```
OPENAI_API_KEY=<your-openai-api-key>
MAILGUN_API_KEY=<your-mailgun-api-key>
```

These environment variables are required for the core functionality of the app, including natural language transaction processing and secure email-based wallet creation.

## Learn More

To learn more about the tools and technologies used in this project, check out the following resources:

- [RainbowKit Documentation](https://rainbowkit.com) - Customize your wallet connection flow.
- [wagmi Documentation](https://wagmi.sh) - Interact with Ethereum and manage wallet connections.
- [Next.js Documentation](https://nextjs.org/docs) - Build your Next.js app with ease.

