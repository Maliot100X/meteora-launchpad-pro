#!/bin/bash

# 🔥 Sovereign Launchpad - Quick Deploy Script
# Usage: ./deploy.sh [dev|prod]

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "  _____                                    _       _            _           _   "
echo " / ____|                                  | |     | |          | |         | |  "
echo "| (___   _   _  ___  ___ ___    __ _    __| | ___ | | ___   ___| | __ _  __| |  "
echo " \\___ \\ | | | |/ _ \\/ __/ __|  / _\` |  / _\` |/ _ \\| |/ _ \\ / __| |/ _\` |/ _\` |  "
echo " ____) || |_| |  __/\\__ \\__ \\ | (_| | | (_| | (_) | | (_) | (__| | (_| | (_| |  "
echo "|_____/  \\__,_|\\___||___/___/  \\__,_|  \\__,_|\\___/|_|\\___/ \\___|_|\\__,_|\\__,_|  "
echo "                                                                               "
echo -e "${NC}"

# Check if environment is set
if [ ! -f .env.local ]; then
    echo -e "${RED}Error: .env.local not found!${NC}"
    echo "Please create .env.local file first:"
    echo "  cp .env.local.example .env.local"
    echo "  # Edit .env.local with your credentials"
    exit 1
fi

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed!${NC}"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}Error: Node.js 18+ is required!${NC}"
    exit 1
fi

# Mode selection
MODE=${1:-dev}

if [ "$MODE" == "prod" ]; then
    echo -e "${YELLOW}🚀 Production Deployment Mode${NC}"
else
    echo -e "${YELLOW}🔧 Development Mode${NC}"
fi

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install

# Build
echo -e "${BLUE}🔨 Building project...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful!${NC}"

# Deploy
if [ "$MODE" == "prod" ]; then
    echo -e "${BLUE}🚀 Deploying to production...${NC}"
    
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        echo -e "${YELLOW}⚠️  Vercel CLI not found. Installing...${NC}"
        npm i -g vercel
    fi
    
    vercel --prod
    
    echo -e "${GREEN}✅ Production deployment complete!${NC}"
    echo ""
    echo -e "${YELLOW}Your launchpad is live at:${NC}"
    vercel list --meta | grep "Production"
else
    echo -e "${BLUE}🔧 Starting development server...${NC}"
    echo -e "${GREEN}✅ Visit: http://localhost:3000${NC}"
    npm run dev
fi
