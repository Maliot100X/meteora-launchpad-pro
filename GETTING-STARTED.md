# 🚀 Getting Started with Sovereign Launchpad

Complete step-by-step guide to get all required API keys and deploy your token launchpad.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Get Cloudflare R2 Credentials](#1-get-cloudflare-r2-credentials)
3. [Get Solana RPC URL](#2-get-solana-rpc-url)
4. [Get Meteora Pool Config](#3-get-meteora-pool-config)
5. [Setup Project](#4-setup-project)
6. [Deploy to Vercel](#5-deploy-to-vercel)

---

## Prerequisites

- Node.js 18+ installed
- GitHub account
- Vercel account (free)
- Cloudflare account (free)
- Solana wallet (Phantom recommended)

---

## 1. Get Cloudflare R2 Credentials

### Step-by-Step:

1. **Sign up for Cloudflare** (if you don't have an account)
   - Go to: https://dash.cloudflare.com/sign-up
   - Complete the registration
   - No credit card required for basic usage

2. **Navigate to R2**
   - In the left sidebar, click **"R2"**
   - Or visit: https://dash.cloudflare.com/?to=/:account/r2

3. **Create a Bucket**
   - Click **"Create bucket"**
   - Name: `token-metadata` (or your preferred name)
   - Location: Default (Automatic)
   - Click **"Create bucket"**

4. **Get Account ID**
   - Look at the URL: `https://dash.cloudflare.com/YOUR_ACCOUNT_ID/...`
   - The long string is your **R2_ACCOUNT_ID**
   - Or find it in the right sidebar under **"Account ID"**

5. **Create API Token**
   - Click **"Manage R2 API Tokens"**
   - Click **"Create API token"**
   - Permissions needed:
     - **Object Read & Write**: Allow
     - **Bucket Read & Write**: Allow
   - Click **"Create API Token"**

6. **Copy Credentials**
   - You'll see:
     - **Access Key ID** → `R2_ACCESS_KEY_ID`
     - **Secret Access Key** → `R2_SECRET_ACCESS_KEY`
   - ⚠️ **Save these immediately** - Secret Access Key is shown only once!

### Result:
```env
R2_ACCESS_KEY_ID=your_access_key_here
R2_SECRET_ACCESS_KEY=your_secret_key_here
R2_ACCOUNT_ID=your_account_id_here
R2_BUCKET=token-metadata
```

---

## 2. Get Solana RPC URL

### Option A: Free Devnet RPC (Testing)
```env
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
RPC_URL=https://api.devnet.solana.com
```

### Option B: Helius (Recommended for Production)

1. **Sign up for Helius**
   - Go to: https://helius.xyz
   - Click **"Get Started"**
   - Sign up with email or Google

2. **Create API Key**
   - In dashboard, click **"API Keys"**
   - Click **"Create New Key"**
   - Name: "Sovereign Launchpad"
   - Network: Mainnet (or Devnet for testing)

3. **Copy RPC URL**
   - You'll get something like:
   ```
   https://mainnet.helius-rpc.com/?api-key=your-api-key-here
   ```

### Result:
```env
# For devnet (testing)
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
RPC_URL=https://api.devnet.solana.com

# For mainnet (production)
# NEXT_PUBLIC_RPC_URL=https://mainnet.helius-rpc.com/?api-key=your_key
# RPC_URL=https://mainnet.helius-rpc.com/?api-key=your_key
```

---

## 3. Get Meteora Pool Config

### What is Pool Config?
The pool config defines the bonding curve parameters for your token launches.

### Option A: Use Testnet Config (Quick Start)
```env
POOL_CONFIG_KEY=CpTDzD6KYGHA28Wn9rZs7MM8UPZHvYgjD2Y5ZdPjuBWu
```
This is a testnet config for devnet testing.

### Option B: Create Your Own Config (Production)

1. **Clone Meteora Invent**
   ```bash
   git clone https://github.com/MeteoraAg/meteora-invent.git
   cd meteora-invent
   ```

2. **Install Dependencies**
   ```bash
   npm install -g pnpm
   pnpm install
   ```

3. **Create Config**
   ```bash
   cd studio
   cp .env.example .env
   # Edit .env with your wallet key
   
   # Create DBC config
   pnpm studio dbc-create-config
   ```

4. **Save Config Key**
   - The output will show your config key
   - Copy it to your .env.local

---

## 4. Setup Project

### Step 1: Clone Repository
```bash
cd /workspace
git clone https://github.com/YOUR_USERNAME/sovereign-launchpad.git
```

### Step 2: Install Dependencies
```bash
cd sovereign-launchpad
npm install
```

### Step 3: Configure Environment
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your credentials:
```env
# Solana (Devnet for testing)
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_SOLANA_NETWORK=devnet

# Cloudflare R2
R2_ACCESS_KEY_ID=your_key_here
R2_SECRET_ACCESS_KEY=your_secret_here
R2_ACCOUNT_ID=your_account_id_here
R2_BUCKET=token-metadata

# Meteora (Testnet config)
POOL_CONFIG_KEY=CpTDzD6KYGHA28Wn9rZs7MM8UPZHvYgjD2Y5ZdPjuBWu

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Sovereign Launchpad
```

### Step 4: Test Locally
```bash
npm run dev
```

Open http://localhost:3000

### Step 5: Test Token Launch
1. Connect wallet (make sure you're on devnet)
2. Get devnet SOL from faucet: https://faucet.solana.com/
3. Go to Launchpad → Create Token
4. Upload logo, fill details
5. Launch token!

---

## 5. Deploy to Vercel

### Method 1: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   
   # Follow prompts:
   # - Set up and deploy? [Y/n] → Y
   # - Link to existing project? [y/N] → N
   # - What's your project name? → sovereign-launchpad
   # - In which directory is your code located? → ./
   ```

4. **Add Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_RPC_URL
   vercel env add RPC_URL
   vercel env add R2_ACCESS_KEY_ID
   vercel env add R2_SECRET_ACCESS_KEY
   vercel env add R2_ACCOUNT_ID
   vercel env add R2_BUCKET
   vercel env add POOL_CONFIG_KEY
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Method 2: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/sovereign-launchpad.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to: https://vercel.com/new
   - Import your GitHub repository
   - Framework Preset: Next.js
   - Click **"Deploy"**

3. **Add Environment Variables**
   - In Vercel dashboard → Your Project → Settings → Environment Variables
   - Add all variables from `.env.local`
   - For each variable:
     - Key: Variable name
     - Value: Your value
     - Environment: Production (and Preview if needed)

4. **Redeploy**
   - Vercel will auto-deploy on git push
   - Or click "Redeploy" in dashboard

---

## 🎉 Success!

Your Sovereign Launchpad is now live!

### Next Steps:

1. **Test on Devnet**
   - Launch a test token
   - Verify everything works

2. **Switch to Mainnet** (when ready)
   - Update RPC URL to mainnet
   - Get mainnet pool config
   - Test with small amounts first

3. **Customize**
   - Update branding in `app/layout.tsx`
   - Change colors in `tailwind.config.ts`
   - Add your own features

4. **Share!**
   - Tweet your launchpad
   - Share with the community
   - Get feedback

---

## 🔗 Quick Links

| Resource | URL |
|----------|-----|
| Cloudflare Dashboard | https://dash.cloudflare.com |
| Helius RPC | https://helius.xyz |
| Vercel Dashboard | https://vercel.com/dashboard |
| Solana Faucet | https://faucet.solana.com |
| Meteora Docs | https://docs.meteora.ag |
| GitHub Repo | https://github.com/YOUR_USERNAME/sovereign-launchpad |

---

## 🆘 Troubleshooting

### "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "R2 upload fails"
- Check credentials are correct
- Verify bucket name matches
- Ensure bucket is in correct region

### "Wallet won't connect"
- Make sure you're on correct network (devnet/mainnet)
- Check RPC URL is accessible
- Try refreshing the page

### "Transaction fails"
- Ensure wallet has SOL for fees
- Check pool config key is valid
- Verify you're on correct network

---

**Questions? Join our Discord or open a GitHub issue!**

**Built with 🔥 by King Hermes**
