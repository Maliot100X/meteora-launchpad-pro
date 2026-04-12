---
name: sovereign-launchpad
description: Deploy a full token launchpad platform on Solana with Meteora DBC integration
version: 1.0.0
author: King Hermes
category: blockchain
tags: [solana, meteora, token, launchpad, defi]
---

# 🔥 Sovereign Launchpad

A complete production-ready token launchpad platform built with Next.js, Solana Web3.js, and Meteora Dynamic Bonding Curves.

## 🚀 What This Skill Does

Deploys a full-stack token launchpad that enables:
- **Token Creation**: Launch tokens with custom names, symbols, and logos
- **Bonding Curves**: Fair launch mechanism via Meteora DBC
- **Auto-Migration**: Automatic graduation to DAMM pools at 100% curve
- **Wallet Integration**: Phantom, Solflare, and more
- **Agent Integration**: Built for King Hermes AI agent orchestration

## 📋 Prerequisites

- Node.js 18+
- Vercel account (for deployment)
- Cloudflare account (for R2 storage)
- Solana wallet with devnet SOL (for testing)

## 🛠️ Installation

### Step 1: Clone Repository
```bash
cd /workspace
rm -rf sovereign-launchpad
git clone https://github.com/Maliot100X/sovereign-launchpad.git
```

### Step 2: Install Dependencies
```bash
cd sovereign-launchpad
npm install
```

### Step 3: Configure Environment
```bash
cp .env.local.example .env.local
# Edit .env.local with your credentials
```

### Step 4: Run Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

## 🔧 Environment Variables

```env
# Solana Configuration (Testnet)
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_SOLANA_NETWORK=devnet

# Cloudflare R2 Storage
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_key
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_BUCKET=token-metadata

# Meteora Configuration
POOL_CONFIG_KEY=your_pool_config_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Sovereign Launchpad
```

## 📁 Project Structure

```
sovereign-launchpad/
├── app/
│   ├── api/
│   │   ├── upload/route.ts           # Logo upload & pool TX creation
│   │   ├── send-transaction/route.ts  # Submit signed transactions
│   │   ├── explore/route.ts           # List launched tokens
│   │   └── token-details/route.ts     # Token info & quotes
│   ├── components/
│   │   └── ui/                        # Reusable UI components
│   ├── contexts/
│   │   └── WalletContext.tsx          # Solana wallet provider
│   ├── launchpad/
│   │   └── page.tsx                   # Token creation UI
│   ├── agents/
│   │   └── page.tsx                   # AI agents dashboard
│   ├── skills/
│   │   └── page.tsx                   # Skills library
│   ├── page.tsx                       # Main dashboard
│   ├── layout.tsx                     # Root layout
│   └── globals.css                    # Global styles
├── public/                            # Static assets
├── package.json                       # Dependencies
├── tailwind.config.ts                 # Tailwind configuration
└── next.config.mjs                    # Next.js configuration
```

## 🎯 Usage

### For End Users

1. **Connect Wallet**: Click "Connect Wallet" in the header
2. **Launch Token**: Go to Launchpad tab → Create Token
3. **Fill Details**: Upload logo, enter name/symbol, add socials
4. **Sign Transaction**: Approve the Meteora pool creation TX
5. **Token Live**: Your token is now tradable on the bonding curve!

### For Developers

```typescript
// Example: Create token programmatically
const response = await fetch('/api/upload', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    tokenName: "My Token",
    tokenSymbol: "MTK",
    tokenLogo: base64Image,
    userWallet: wallet.publicKey.toBase58(),
    website: "https://mytoken.com",
    twitter: "https://x.com/mytoken",
  }),
});

const { poolTx, mint } = await response.json();
// Sign and send poolTx with wallet...
```

## 🌐 Deploy to Vercel

### Option 1: CLI Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Option 2: Git Integration
1. Push code to GitHub
2. Import repository in Vercel dashboard
3. Add environment variables
4. Deploy automatically on every push

## 🔗 API Reference

### POST /api/upload
Uploads token logo and creates pool transaction.

**Request:**
```json
{
  "tokenLogo": "data:image/png;base64,...",
  "tokenName": "My Token",
  "tokenSymbol": "MTK",
  "userWallet": "abc123...",
  "website": "https://...",
  "twitter": "https://..."
}
```

**Response:**
```json
{
  "success": true,
  "mint": "token_mint_address",
  "poolTx": "base64_encoded_transaction",
  "metadataUrl": "https://..."
}
```

### POST /api/send-transaction
Submits signed transaction to Solana.

**Request:**
```json
{
  "signedTransaction": "base64_encoded_signed_tx"
}
```

### GET /api/explore
Lists all launched tokens.

**Query Params:**
- `search` - Filter by name/symbol
- `sortBy` - volume | marketCap | price | holders
- `limit` - Results per page
- `offset` - Pagination offset

## 🎨 Customization

### Change Branding
Edit `app/layout.tsx`:
```typescript
export const metadata = {
  title: "Your Launchpad Name",
  description: "Your description...",
}
```

### Update Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  sovereign: {
    gold: "#your-color",
    // ...
  }
}
```

### Add New Agents
Edit `app/agents/page.tsx`:
```typescript
const AGENTS = [
  {
    id: 'your-agent',
    name: 'Your Agent',
    // ...
  }
];
```

## 🛡️ Security Considerations

1. **Environment Variables**: Never commit .env.local
2. **R2 Credentials**: Use minimal permissions
3. **Transaction Validation**: Always validate user inputs
4. **Rate Limiting**: Add rate limits for production
5. **Mainnet Testing**: Test thoroughly on devnet first

## 📱 Mobile Support

The launchpad is fully responsive:
- Mobile wallet connection
- Touch-optimized forms
- Responsive token cards
- Mobile-first navigation

## 🔥 Advanced Features

### WebSocket Integration (Coming Soon)
```typescript
// Real-time price updates
const ws = new WebSocket('wss://api.yourdomain.com');
ws.onmessage = (event) => {
  const update = JSON.parse(event.data);
  // Update UI with new price
};
```

### Telegram Bot Integration
```typescript
// Notify on new token launches
bot.on('new_token', async (token) => {
  await bot.sendMessage(CHAT_ID, 
    `🚀 New Token: ${token.name} ($${token.symbol})`
  );
});
```

## 📚 Troubleshooting

### "Cannot connect wallet"
- Check if wallet adapter dependencies are installed
- Verify RPC_URL is accessible

### "Upload failed"
- Verify R2 credentials in .env.local
- Check bucket permissions

### "Transaction failed"
- Ensure wallet has SOL for fees
- Check pool config key validity

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing`
5. Open Pull Request

## 📄 License

MIT License - Created by King Hermes for Solxhunter X100

## 🔗 Resources

- [Meteora Documentation](https://docs.meteora.ag)
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)
- [Next.js Documentation](https://nextjs.org/docs)
- [King Hermes GitHub](https://github.com/Maliot100X/The-Supreme-Agent-Orchestrator)

---

**Built with 🔥 by King Hermes | 2026**
