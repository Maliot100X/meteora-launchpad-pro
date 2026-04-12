'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { 
  Rocket, 
  Search, 
  Upload, 
  Globe, 
  Twitter, 
  Coins, 
  Image as ImageIcon,
  Loader2,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Users,
  Zap,
  Info,
  ChevronRight,
  ExternalLink,
  Wallet,
  Sparkles
} from 'lucide-react';
import toast from 'react-hot-toast';

// Tab types
const LAUNCHPAD_TABS = [
  { id: 'explore', label: 'Explore Tokens', icon: Search },
  { id: 'create', label: 'Launch Token', icon: Rocket },
  { id: 'my-tokens', label: 'My Tokens', icon: Coins },
];

// Mock data for explore
const MOCK_TOKENS = [
  { 
    id: '1',
    name: 'Alpha Token', 
    symbol: 'ALPHA', 
    price: '0.0045', 
    marketCap: '45,000',
    volume: '12,340',
    holders: '1,234',
    progress: 67,
    logo: '🎯',
    creator: 'abc123...xyz'
  },
  { 
    id: '2',
    name: 'Beta Coin', 
    symbol: 'BETA', 
    price: '0.0012', 
    marketCap: '23,400',
    volume: '8,560',
    holders: '892',
    progress: 34,
    logo: '🚀',
    creator: 'def456...abc'
  },
  { 
    id: '3',
    name: 'Gamma DAO', 
    symbol: 'GAMMA', 
    price: '0.0089', 
    marketCap: '89,000',
    volume: '23,450',
    holders: '2,456',
    progress: 89,
    logo: '⚡',
    creator: 'ghi789...def'
  },
];

export default function LaunchpadView() {
  const [activeTab, setActiveTab] = useState('explore');
  const { connected, publicKey } = useWallet();

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sovereign-gold/20 via-sovereign-purple/10 to-sovereign-dark border border-sovereign-gold/30 p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sovereign-gold/20 rounded-full blur-[100px]" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-sovereign-gold/20 text-sovereign-gold text-xs font-semibold border border-sovereign-gold/30">
              Powered by Meteora DBC
            </span>
            <span className="px-3 py-1 rounded-full bg-sovereign-green/20 text-sovereign-green text-xs font-semibold border border-sovereign-green/30">
              Testnet Ready
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Launch Your <span className="text-gradient-gold">Sovereign Token</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mb-6">
            Create tokens with Meteora's Dynamic Bonding Curves. Fair launch, auto-migration to DAMM pools, 
            and AI-powered trading agents.
          </p>

          <div className="flex flex-wrap gap-4">
            {!connected ? (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                <Wallet className="w-5 h-5 text-sovereign-gold" />
                <span className="text-white/70">Connect wallet to launch tokens</span>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('create')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sovereign-gold to-sovereign-gold-light text-black font-bold hover:shadow-lg hover:shadow-sovereign-gold/30 transition-all"
              >
                <Rocket className="w-5 h-5" />
                Launch Token
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
            
            <button
              onClick={() => setActiveTab('explore')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white border border-white/20 hover:bg-white/10 transition-all"
            >
              <Search className="w-5 h-5" />
              Explore Tokens
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
          {[
            { label: 'Tokens Launched', value: '0', suffix: '' },
            { label: 'Total Volume', value: '0', suffix: ' SOL' },
            { label: 'Active Traders', value: '0', suffix: '' },
            { label: 'Avg Launch Time', value: '<2', suffix: ' min' },
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-bold text-gradient-gold">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
        {LAUNCHPAD_TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all flex-1 justify-center ${
                activeTab === tab.id
                  ? 'bg-sovereign-gold text-black'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === 'explore' && <ExploreTokens />}
        {activeTab === 'create' && <CreateToken />}
        {activeTab === 'my-tokens' && <MyTokens />}
      </div>
    </div>
  );
}

// Explore Tokens Component
function ExploreTokens() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('volume');

  const filteredTokens = MOCK_TOKENS.filter(token => 
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search tokens..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-sovereign-gold"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-sovereign-gold"
        >
          <option value="volume" className="bg-sovereign-dark">Sort by Volume</option>
          <option value="marketCap" className="bg-sovereign-dark">Sort by Market Cap</option>
          <option value="price" className="bg-sovereign-dark">Sort by Price</option>
          <option value="holders" className="bg-sovereign-dark">Sort by Holders</option>
        </select>
      </div>

      {/* Token Grid */}
      {filteredTokens.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTokens.map((token) => (
            <motion.div
              key={token.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card group cursor-pointer hover:border-sovereign-gold/50"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sovereign-gold to-sovereign-gold-dark flex items-center justify-center text-2xl">
                    {token.logo}
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-sovereign-gold transition-colors">
                      {token.name}
                    </h3>
                    <p className="text-sm text-white/50">${token.symbol}</p>
                  </div>
                </div>
                <span className="px-2 py-1 rounded-lg bg-sovereign-green/10 text-sovereign-green text-xs font-semibold">
                  Live
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-white/50">Bonding Curve Progress</span>
                  <span className="text-sovereign-gold">{token.progress}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-sovereign-gold to-sovereign-gold-light rounded-full"
                    style={{ width: `${token.progress}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-white/40">Price</p>
                  <p className="text-white font-medium">{token.price} SOL</p>
                </div>
                <div>
                  <p className="text-white/40">Market Cap</p>
                  <p className="text-white font-medium">{token.marketCap}</p>
                </div>
                <div>
                  <p className="text-white/40">Volume</p>
                  <p className="text-sovereign-green font-medium">{token.volume}</p>
                </div>
                <div>
                  <p className="text-white/40">Holders</p>
                  <p className="text-white font-medium flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {token.holders}
                  </p>
                </div>
              </div>

              <button className="w-full mt-4 py-2 rounded-lg bg-white/5 hover:bg-sovereign-gold/20 border border-white/10 hover:border-sovereign-gold/50 text-white/70 hover:text-sovereign-gold transition-all text-sm font-medium flex items-center justify-center gap-2">
                View Details
                <ExternalLink className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="card flex flex-col items-center justify-center py-16">
          <Search className="w-16 h-16 text-white/20 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No tokens found</h3>
          <p className="text-white/50 text-center max-w-md">
            Try adjusting your search or be the first to launch a token!
          </p>
        </div>
      )}
    </div>
  );
}

// Create Token Component
function CreateToken() {
  const { connected, publicKey, signTransaction } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    tokenName: '',
    tokenSymbol: '',
    description: '',
    website: '',
    twitter: '',
    telegram: '',
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Logo must be under 2MB');
        return;
      }
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setLogoPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!connected || !publicKey) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!logoFile) {
      toast.error('Please upload a logo');
      return;
    }

    if (!formData.tokenName || !formData.tokenSymbol) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      const reader = new FileReader();
      const base64Logo = await new Promise<string>((resolve) => {
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(logoFile);
      });

      // Step 1: Upload to API
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tokenLogo: base64Logo,
          tokenName: formData.tokenName,
          tokenSymbol: formData.tokenSymbol,
          description: formData.description,
          userWallet: publicKey.toBase58(),
          website: formData.website,
          twitter: formData.twitter,
          telegram: formData.telegram,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create pool');
      }

      const data = await response.json();
      
      toast.success('Token launch prepared! Sign transaction to complete.');
      
      // In real implementation, we would sign and send the transaction here
      // For now, we just show success
      setStep(3);
      
    } catch (error) {
      console.error('Launch error:', error);
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!connected) {
    return (
      <div className="card flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 rounded-2xl bg-sovereign-gold/10 flex items-center justify-center mb-6 animate-pulse">
          <Wallet className="w-10 h-10 text-sovereign-gold" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Connect Your Wallet</h3>
        <p className="text-white/50 text-center max-w-md mb-6">
          Connect your Solana wallet to launch tokens. We support Phantom, Solflare, and more.
        </p>
        <div className="flex items-center gap-2 text-sm text-white/40">
          <Info className="w-4 h-4" />
          <span>All transactions are signed by you</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
              step >= s 
                ? 'bg-sovereign-gold text-black' 
                : 'bg-white/10 text-white/40'
            }`}>
              {step > s ? <CheckCircle className="w-5 h-5" /> : s}
            </div>
            {s < 3 && (
              <div className={`w-16 h-0.5 mx-2 ${
                step > s ? 'bg-sovereign-gold' : 'bg-white/10'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="card">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Token Details</h3>
              <p className="text-sm text-white/50">Enter the basic information for your token</p>
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Token Logo <span className="text-sovereign-red">*</span>
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative cursor-pointer border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  logoPreview 
                    ? 'border-sovereign-gold bg-sovereign-gold/5' 
                    : 'border-white/20 hover:border-white/40 bg-white/5'
                }`}
              >
                {logoPreview ? (
                  <div className="relative">
                    <img 
                      src={logoPreview} 
                      alt="Token logo" 
                      className="w-24 h-24 rounded-xl mx-auto object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLogoFile(null);
                        setLogoPreview(null);
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-sovereign-red text-white text-xs flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="w-12 h-12 text-white/30 mx-auto mb-3" />
                    <p className="text-white/50 text-sm">Click to upload logo</p>
                    <p className="text-white/30 text-xs mt-1">PNG or JPG, max 2MB</p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Token Name */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Token Name <span className="text-sovereign-red">*</span>
              </label>
              <input
                type="text"
                value={formData.tokenName}
                onChange={(e) => setFormData({ ...formData, tokenName: e.target.value })}
                placeholder="My Awesome Token"
                maxLength={32}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-sovereign-gold"
              />
            </div>

            {/* Token Symbol */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Token Symbol <span className="text-sovereign-red">*</span>
              </label>
              <input
                type="text"
                value={formData.tokenSymbol}
                onChange={(e) => setFormData({ ...formData, tokenSymbol: e.target.value.toUpperCase() })}
                placeholder="TOKEN"
                maxLength={10}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-sovereign-gold uppercase"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your token and its purpose..."
                maxLength={500}
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-sovereign-gold resize-none"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!formData.tokenName || !formData.tokenSymbol || !logoFile}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sovereign-gold to-sovereign-gold-light text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-sovereign-gold/30 transition-all flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Social Links</h3>
              <p className="text-sm text-white/50">Add your project links (optional)</p>
            </div>

            {/* Website */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                <Globe className="w-4 h-4" />
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://yourproject.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-sovereign-gold"
              />
            </div>

            {/* Twitter */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                <Twitter className="w-4 h-4" />
                Twitter / X
              </label>
              <input
                type="url"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                placeholder="https://x.com/yourproject"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-sovereign-gold"
              />
            </div>

            {/* Telegram */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                <Zap className="w-4 h-4" />
                Telegram
              </label>
              <input
                type="url"
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                placeholder="https://t.me/yourproject"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-sovereign-gold"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl bg-white/5 text-white font-semibold hover:bg-white/10 transition-all"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-sovereign-gold to-sovereign-gold-light text-black font-bold hover:shadow-lg hover:shadow-sovereign-gold/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Launching...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Launch Token
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full bg-sovereign-green/20 flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-10 h-10 text-sovereign-green" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Token Launch Prepared!</h3>
            <p className="text-white/50 mb-6 max-w-md mx-auto">
              Your token is ready to launch. In production, you would sign the transaction now.
            </p>
            <button
              onClick={() => {
                setStep(1);
                setFormData({
                  tokenName: '',
                  tokenSymbol: '',
                  description: '',
                  website: '',
                  twitter: '',
                  telegram: '',
                });
                setLogoFile(null);
                setLogoPreview(null);
              }}
              className="px-6 py-3 rounded-xl bg-white/5 text-white font-semibold hover:bg-white/10 transition-all"
            >
              Launch Another Token
            </button>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="mt-6 card border-sovereign-gold/20 bg-sovereign-gold/5">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-sovereign-gold flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-white mb-1">How it works</h4>
            <ul className="text-sm text-white/60 space-y-1">
              <li>• Token launches on Meteora Dynamic Bonding Curve</li>
              <li>• Early buyers get better prices</li>
              <li>• When curve reaches 100%, it auto-migrates to DAMM</li>
              <li>• You earn 0.5% of all trading fees</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// My Tokens Component
function MyTokens() {
  const { connected, publicKey } = useWallet();

  if (!connected) {
    return (
      <div className="card flex flex-col items-center justify-center py-20">
        <Coins className="w-16 h-16 text-white/20 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Connect Wallet</h3>
        <p className="text-white/50">Connect your wallet to see your launched tokens</p>
      </div>
    );
  }

  return (
    <div className="card flex flex-col items-center justify-center py-20">
      <div className="w-16 h-16 rounded-2xl bg-sovereign-purple/20 flex items-center justify-center mb-4">
        <Sparkles className="w-8 h-8 text-sovereign-purple" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">No Tokens Yet</h3>
      <p className="text-white/50 mb-6">You haven&apos;t launched any tokens yet</p>
      <button
        onClick={() => {}}
        className="px-6 py-2 rounded-lg bg-sovereign-gold/20 text-sovereign-gold border border-sovereign-gold/30 hover:bg-sovereign-gold/30 transition-all"
      >
        Launch Your First Token
      </button>
    </div>
  );
}
