import { NextRequest, NextResponse } from 'next/server';
import { Keypair, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { createCreatePoolInstruction } from '@meteora-ag/dynamic-bonding-curve-sdk';
import * as AWS from 'aws-sdk';
import { z } from 'zod';

// R2 Configuration
const r2 = new AWS.S3({
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  region: 'auto',
  signatureVersion: 'v4',
});

const BUCKET = process.env.R2_BUCKET || 'token-metadata';
const POOL_CONFIG_KEY = process.env.POOL_CONFIG_KEY || '';

// Validation schema
const uploadSchema = z.object({
  tokenLogo: z.string().min(1, 'Token logo is required'),
  tokenName: z.string().min(3, 'Token name must be at least 3 characters').max(32, 'Token name too long'),
  tokenSymbol: z.string().min(1, 'Token symbol is required').max(10, 'Symbol too long'),
  description: z.string().max(500, 'Description too long').optional(),
  userWallet: z.string().min(32, 'Invalid wallet address'),
  website: z.string().url().optional().or(z.literal('')),
  twitter: z.string().url().optional().or(z.literal('')),
  telegram: z.string().url().optional().or(z.literal('')),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validationResult = uploadSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult.error.errors 
        },
        { status: 400 }
      );
    }

    const { 
      tokenLogo, 
      tokenName, 
      tokenSymbol, 
      description, 
      userWallet, 
      website, 
      twitter, 
      telegram 
    } = validationResult.data;

    // Validate user wallet
    let userPublicKey: PublicKey;
    try {
      userPublicKey = new PublicKey(userWallet);
    } catch {
      return NextResponse.json(
        { error: 'Invalid wallet address' },
        { status: 400 }
      );
    }

    // Generate keypair for the token mint
    const mintKeypair = Keypair.generate();
    const mintPublicKey = mintKeypair.publicKey;

    console.log('Generated mint:', mintPublicKey.toBase58());

    // Extract base64 from data URL
    const base64Data = tokenLogo.split(',')[1];
    if (!base64Data) {
      return NextResponse.json(
        { error: 'Invalid image data' },
        { status: 400 }
      );
    }

    // Upload logo to R2
    const logoBuffer = Buffer.from(base64Data, 'base64');
    const logoKey = `logos/${mintPublicKey.toBase58()}.png`;
    
    try {
      await r2.putObject({
        Bucket: BUCKET,
        Key: logoKey,
        Body: logoBuffer,
        ContentType: 'image/png',
        ACL: 'public-read',
      }).promise();
    } catch (uploadError) {
      console.error('R2 upload error:', uploadError);
      return NextResponse.json(
        { error: 'Failed to upload logo to storage' },
        { status: 500 }
      );
    }

    const logoUrl = `https://${BUCKET}.${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${logoKey}`;

    // Create token metadata
    const metadata = {
      name: tokenName,
      symbol: tokenSymbol,
      description: description || `Token created via Sovereign Launchpad`,
      image: logoUrl,
      external_url: website || '',
      properties: {
        website: website || '',
        twitter: twitter || '',
        telegram: telegram || '',
        launchpad: 'Sovereign Launchpad',
        created_at: new Date().toISOString(),
      },
      attributes: [
        { trait_type: 'Launchpad', value: 'Sovereign' },
        { trait_type: 'Bonding Curve', value: 'Meteora DBC' },
        { trait_type: 'Creator', value: userWallet.slice(0, 8) + '...' },
      ],
    };

    // Upload metadata to R2
    const metadataKey = `metadata/${mintPublicKey.toBase58()}.json`;
    
    try {
      await r2.putObject({
        Bucket: BUCKET,
        Key: metadataKey,
        Body: JSON.stringify(metadata, null, 2),
        ContentType: 'application/json',
        ACL: 'public-read',
      }).promise();
    } catch (uploadError) {
      console.error('Metadata upload error:', uploadError);
      return NextResponse.json(
        { error: 'Failed to upload metadata' },
        { status: 500 }
      );
    }

    const metadataUrl = `https://${BUCKET}.${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${metadataKey}`;

    // For testnet, we'll return a mock transaction
    // In production, this would build the actual Meteora DBC transaction
    console.log('Pool config key:', POOL_CONFIG_KEY);
    
    // Create a mock transaction for testing
    // In production, this would be a real Meteora pool creation transaction
    const mockTransaction = new Transaction();
    
    // Add a memo instruction for testing
    mockTransaction.add(
      SystemProgram.transfer({
        fromPubkey: userPublicKey,
        toPubkey: userPublicKey,
        lamports: 0,
      })
    );

    return NextResponse.json({
      success: true,
      message: 'Token launch prepared successfully',
      mint: mintPublicKey.toBase58(),
      metadataUrl,
      logoUrl,
      metadata,
      // In production, return the actual transaction
      poolTx: mockTransaction.serialize({ requireAllSignatures: false }).toString('base64'),
      keypairSecret: Buffer.from(mintKeypair.secretKey).toString('base64'),
      explorerUrl: `https://explorer.solana.com/address/${mintPublicKey.toBase58()}?cluster=devnet`,
    });

  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: (error as Error).message 
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    service: 'Sovereign Launchpad Upload API',
    version: '1.0.0',
  });
}
