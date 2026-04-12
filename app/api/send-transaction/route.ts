import { NextRequest, NextResponse } from 'next/server';
import { Connection, Transaction, TransactionConfirmationStrategy } from '@solana/web3.js';

const RPC_URL = process.env.RPC_URL || 'https://api.devnet.solana.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { signedTransaction } = body;

    if (!signedTransaction) {
      return NextResponse.json(
        { error: 'Missing signed transaction' },
        { status: 400 }
      );
    }

    // Connect to Solana
    const connection = new Connection(RPC_URL, {
      commitment: 'confirmed',
      confirmTransactionInitialTimeout: 60000,
    });

    // Deserialize the signed transaction
    let transaction: Transaction;
    try {
      transaction = Transaction.from(Buffer.from(signedTransaction, 'base64'));
    } catch {
      return NextResponse.json(
        { error: 'Invalid transaction format' },
        { status: 400 }
      );
    }

    // Send the transaction
    const rawTransaction = transaction.serialize();
    const signature = await connection.sendRawTransaction(rawTransaction, {
      skipPreflight: false,
      preflightCommitment: 'confirmed',
    });

    console.log('Transaction sent:', signature);

    // Wait for confirmation with timeout
    const confirmationStrategy: TransactionConfirmationStrategy = {
      signature,
      blockhash: transaction.recentBlockhash || '',
      lastValidBlockHeight: transaction.lastValidBlockHeight || 0,
    };

    try {
      const confirmation = await connection.confirmTransaction(
        confirmationStrategy,
        'confirmed'
      );

      if (confirmation.value.err) {
        console.error('Transaction failed:', confirmation.value.err);
        return NextResponse.json(
          { 
            error: 'Transaction failed', 
            signature,
            details: confirmation.value.err 
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        signature,
        message: 'Transaction confirmed successfully',
        explorerUrl: `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
      });

    } catch (confirmError) {
      console.error('Confirmation error:', confirmError);
      // Transaction might still succeed, return pending status
      return NextResponse.json({
        success: true,
        signature,
        message: 'Transaction submitted, confirmation pending',
        explorerUrl: `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
        pending: true,
      });
    }

  } catch (error) {
    console.error('Transaction error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send transaction', 
        details: (error as Error).message 
      },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    service: 'Sovereign Launchpad Transaction API',
    version: '1.0.0',
  });
}
