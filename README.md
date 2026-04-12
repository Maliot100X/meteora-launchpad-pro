# 🔥 Sovereign Launchpad

<p align="center">
  <img src="https://img.shields.io/badge/Solana-3DDC84?style=for-the-badge&logo=solana&logoColor=white" alt="Solana">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
</p>

<p align="center">
  <strong>The ultimate token launchpad for Solana</strong><br>
  Powered by Meteora DBC • Built for King Hermes AI Agents
</p>

---

## ✨ Features

- 🚀 **Token Launch** - Create tokens with custom branding
- 📈 **Bonding Curves** - Fair launch via Meteora Dynamic Bonding Curves
- 🔄 **Auto-Migration** - Automatic graduation to DAMM pools
- 💼 **Wallet Integration** - Phantom, Solflare, Ledger support
- 🤖 **AI Agent Ready** - Built for autonomous agent orchestration
- 📱 **Mobile First** - Fully responsive design
- ⚡ **Fast** - Optimized for performance
- 🛡️ **Secure** - Best practices for production

---

## 🚀 Quick Start

```bash
# 1. Clone repository
git clone https://github.com/Maliot100X/sovereign-launchpad.git
cd sovereign-launchpad

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.local.example .env.local
# Edit .env.local with your credentials

# 4. Run development server
npm run dev
```

Visit: http://localhost:3000

---

## 📋 Prerequisites

- Node.js 18+
- Cloudflare R2 account (for file storage)
- Solana wallet with devnet SOL

See [GETTING-STARTED.md](./GETTING-STARTED.md) for detailed setup instructions.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React 18, TypeScript |
| Styling | Tailwind CSS, Framer Motion |
| Blockchain | Solana Web3.js, Meteora SDK |
| Wallets | Solana Wallet Adapter |
| Storage | Cloudflare R2 |
| Hosting | Vercel |

---

## 📁 Project Structure

```
sovereign-launchpad/
├── app/
│   ├── api/               # API routes
│   ├── components/        # React components
│   ├── contexts/          # Context providers
│   ├── launchpad/         # Token launch UI
│   ├── agents/            # AI agents dashboard
│   ├── skills/            # Skills library
│   ├── page.tsx           # Main dashboard
│   └── layout.tsx         # Root layout
├── public/                # Static assets
└── package.json          # Dependencies
```

---

## 🔗 API Routes

| Route | Description |
|-------|-------------|
| `POST /api/upload` | Upload logo & create pool TX |
| `POST /api/send-transaction` | Submit signed transaction |
| `GET /api/explore` | List launched tokens |
| `GET /api/token-details` | Get token info |

---

## 🌐 Deploy

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Environment Variables

```env
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
R2_ACCESS_KEY_ID=your_key
R2_SECRET_ACCESS_KEY=your_secret
R2_ACCOUNT_ID=your_account
R2_BUCKET=token-metadata
POOL_CONFIG_KEY=your_config
```

---

## 🤖 AI Agent Integration

This platform is designed for **King Hermes** AI agent orchestration:

```typescript
// Example: Agent launches token
const result = await agent.execute('launchpad', {
  tokenName: 'AI Token',
  tokenSymbol: 'AIT',
  // ...
});
```

See [SKILL.md](./SKILL.md) for agent skill documentation.

---

## 📝 Documentation

- [SKILL.md](./SKILL.md) - Complete skill documentation
- [GETTING-STARTED.md](./GETTING-STARTED.md) - Setup guide
- [API Reference](#api-routes) - API documentation

---

## 🆘 Support

- 📧 Email: king@hermes.ai
- 💬 Discord: [Join Server](https://discord.gg/kinghermes)
- 🐦 Twitter: [@kinghermes](https://x.com/kinghermes)
- 🐛 Issues: [GitHub Issues](https://github.com/Maliot100X/sovereign-launchpad/issues)

---

## 🤝 Contributing

Contributions are welcome! See [SKILL.md](./SKILL.md) for guidelines.

---

## 📄 License

MIT License © 2026 King Hermes

---

<p align="center">
  <strong>Built with 🔥 by King Hermes for Solxhunter X100</strong>
</p>

<p align="center">
  <a href="https://github.com/Maliot100X/The-Supreme-Agent-Orchestrator">
    <img src="https://img.shields.io/badge/King%20Hermes-Supreme%20Agent%20Orchestrator-gold?style=for-the-badge" alt="King Hermes">
  </a>
</p>
