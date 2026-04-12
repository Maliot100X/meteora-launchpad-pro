import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey } from '@solana/web3.js';

const RPC_URL = process.env.RPC_URL || 'https://api.devnet.solana.com';

// Mock data for testnet
const MOCK_TOKENS = [
  {
    address: '7nY7H...xyz123',
    name: 'Alpha Token',
    symbol: 'ALPHA',
    logo: 'https://picsum.photos/200/200?random=1',
    price: 0.0045,
    marketCap: 45000,
    volume24h: 12340,
    holders: 1234,
    bondingCurveProgress: 67,
    creator: 'abc123...xyz',
    createdAt: '2026-04-10T10:00:00Z',
  },
  {
    address: '9kP3M...abc456',
    name: 'Beta Coin',
    symbol: 'BETA',
    logo: 'https://picsum.photos/200/200?random=2',
    price: 0.0012,
    marketCap: 23400,
    volume24h: 8560,
    holders: 892,
    bondingCurveProgress: 34,
    creator: 'def456...abc',
    createdAt: '2026-04-09T15:30:00Z',
  },
  {
    address: '2vN9K...def789',
    name: 'Gamma DAO',
    symbol: 'GAMMA',
    logo: 'https://picsum.photos/200/200?random=3',
    price: 0.0089,
    marketCap: 89000,
    volume24h: 23450,
    holders: 2456,
    bondingCurveProgress: 89,
    creator: 'ghi789...def',
    createdAt: '2026-04-08T08:15:00Z',
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'volume';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Filter tokens
    let filteredTokens = MOCK_TOKENS.filter(token => 
      token.name.toLowerCase().includes(search.toLowerCase()) ||
      token.symbol.toLowerCase().includes(search.toLowerCase())
    );

    // Sort tokens
    filteredTokens.sort((a, b) => {
      switch (sortBy) {
        case 'volume':
          return b.volume24h - a.volume24h;
        case 'marketCap':
          return b.marketCap - a.marketCap;
        case 'price':
          return b.price - a.price;
        case 'holders':
          return b.holders - a.holders;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return b.volume24h - a.volume24h;
      }
    });

    // Paginate
    const paginatedTokens = filteredTokens.slice(offset, offset + limit);
    const total = filteredTokens.length;

    return NextResponse.json({
      success: true,
      tokens: paginatedTokens,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });

  } catch (error) {
    console.error('Explore API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch tokens',
        details: (error as Error).message 
      },
      { status: 500 }
    );
  }
}

// Get token details
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address } = body;

    if (!address) {
      return NextResponse.json(
        { error: 'Token address is required' },
        { status: 400 }
      );
    }

    // Find token in mock data
    const token = MOCK_TOKENS.find(t => t.address === address);

    if (!token) {
      return NextResponse.json(
        { error: 'Token not found' },
        { status: 404 }
      );
    }

    // In production, fetch on-chain data here
    const connection = new Connection(RPC_URL);
    
    return NextResponse.json({
      success: true,
      token: {
        ...token,
        // Add more detailed info here
        totalSupply: 1000000000,
        decimals: 9,
        bondingCurveTarget: 85, // SOL amount needed to graduate
        fees: {
          tradingFee: 0.5,
          creatorFee: 0.5,
        },
      },
    });

  } catch (error) {
    console.error('Token details error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch token details',
        details: (error as Error).message 
      },
      { status: 500 }
    );
  }
}
