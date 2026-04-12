import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const mint = searchParams.get('mint');

    if (!mint) {
      return NextResponse.json(
        { error: 'Mint address is required' },
        { status: 400 }
      );
    }

    // Mock token details response
    // In production, fetch from on-chain data
    const tokenDetails = {
      mint,
      name: 'Example Token',
      symbol: 'EXT',
      logo: `https://picsum.photos/200/200?random=${mint.slice(-4)}`,
      description: 'An example token launched on Sovereign Launchpad',
      price: 0.00123,
      marketCap: 123000,
      volume24h: 45000,
      volumeChange24h: 12.5,
      holders: 1234,
      bondingCurve: {
        current: 67,
        target: 85, // SOL needed to graduate
        progress: 78.8,
        remaining: 18.2,
      },
      socials: {
        website: 'https://example.com',
        twitter: 'https://x.com/example',
        telegram: 'https://t.me/example',
      },
      createdAt: '2026-04-10T10:00:00Z',
      creator: 'abc123...xyz789',
      transactions: [
        {
          signature: '5xgH...xyz',
          type: 'buy',
          amount: 1000000,
          price: 0.0012,
          value: 1.2,
          user: 'user1...abc',
          timestamp: '2026-04-12T10:30:00Z',
        },
        {
          signature: '3kLm...def',
          type: 'sell',
          amount: 500000,
          price: 0.00125,
          value: 0.625,
          user: 'user2...def',
          timestamp: '2026-04-12T10:15:00Z',
        },
      ],
      topHolders: [
        { address: 'holder1...', amount: 250000000, percentage: 25 },
        { address: 'holder2...', amount: 150000000, percentage: 15 },
        { address: 'holder3...', amount: 100000000, percentage: 10 },
      ],
    };

    return NextResponse.json({
      success: true,
      token: tokenDetails,
    });

  } catch (error) {
    console.error('Token details API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch token details',
        details: (error as Error).message 
      },
      { status: 500 }
    );
  }
}

// Buy/Sell simulation endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      mint, 
      type, // 'buy' or 'sell'
      amount, // token amount
      slippage = 0.5, // max slippage %
    } = body;

    if (!mint || !type || !amount) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Validate type
    if (!['buy', 'sell'].includes(type)) {
      return NextResponse.json(
        { error: 'Type must be buy or sell' },
        { status: 400 }
      );
    }

    // Mock calculation
    const price = 0.00123;
    const total = amount * price;
    const fee = total * 0.005; // 0.5% fee
    const slippageAmount = total * (slippage / 100);
    const minReceived = type === 'buy' ? amount * (1 - slippage / 100) : total * (1 - slippage / 100);

    return NextResponse.json({
      success: true,
      quote: {
        type,
        mint,
        amount,
        price,
        total,
        fee,
        slippage,
        slippageAmount,
        minReceived,
        priceImpact: 0.1, // %
      },
      // In production, return the actual transaction to sign
      message: 'Quote generated. Sign transaction to execute.',
    });

  } catch (error) {
    console.error('Swap quote error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate quote',
        details: (error as Error).message 
      },
      { status: 500 }
    );
  }
}
