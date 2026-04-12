'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  WalletMultiButton 
} from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { 
  Rocket, 
  Bot, 
  TrendingUp, 
  BookOpen, 
  Activity,
  Cpu,
  Terminal,
  Shield,
  Zap,
  Globe,
  Users,
  BarChart3,
  Sparkles,
  Crown,
  ChevronRight
} from 'lucide-react';
import LaunchpadView from './launchpad/page';
import AgentsView from './agents/page';
import SkillsView from './skills/page';

// Tab configuration
const TABS = [
  { id: 'launchpad', label: 'Launchpad', icon: Rocket, color: 'from-orange-500 to-yellow-500' },
  { id: 'agents', label: 'AI Agents', icon: Bot, color: 'from-purple-500 to-pink-500' },
  { id: 'trading', label: 'Trading', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
  { id: 'skills', label: 'Skills', icon: BookOpen, color: 'from-cyan-500 to-blue-500' },
];

// Stats data
const PLATFORM_STATS = {
  tokensLaunched: 0,
  totalVolume: '0 SOL',
  activeAgents: 3,
  users: '1,247',
};

// Agent status
const AGENTS = [
  { name: 'OpenClaude', status: 'online', model: 'Kimi K2.5 Turbo', provider: 'Fireworks AI', description: 'Primary architect & coder' },
  { name: 'OpenCode', status: 'online', model: 'minimax-m2', provider: 'Ollama Cloud', description: 'Code reviewer & security' },
  { name: 'Gemini', status: 'online', model: 'Gemini Pro', provider: 'Google AI', description: 'Research specialist' },
];

export default function SovereignDashboard() {
  const [activeTab, setActiveTab] = useState('launchpad');
  const [mounted, setMounted] = useState(false);
  const { connected, publicKey } = useWallet();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-sovereign-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-sovereign-gold/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-sovereign-purple/10 rounded-full blur-[128px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-sovereign-dark/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sovereign-gold to-sovereign-gold-dark flex items-center justify-center animate-glow">
                  <Crown className="w-7 h-7 text-black" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-sovereign-green rounded-full flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-black" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient-gold">Sovereign Launchpad</h1>
                <p className="text-xs text-white/50 font-mono">by King Hermes</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-2">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? `bg-gradient-to-r ${tab.color} text-black shadow-lg shadow-${tab.color.split('-')[1]}-500/25`
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Wallet Button */}
            <div className="flex items-center gap-4">
              {connected && publicKey && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sovereign-green/10 border border-sovereign-green/30">
                  <div className="w-2 h-2 rounded-full bg-sovereign-green animate-pulse" />
                  <span className="text-sm font-mono text-sovereign-green">
                    {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
                  </span>
                </div>
              )}
              <WalletMultiButton className="!bg-gradient-to-r !from-sovereign-gold !to-sovereign-gold-light !text-black !font-semibold !rounded-lg !px-4 !py-2 !h-auto" />
            </div>
          </div>

          {/* Mobile Tabs */}
          <div className="md:hidden flex gap-2 pb-4 overflow-x-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-black`
                      : 'text-white/60 bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'launchpad' && <LaunchpadView />}
            {activeTab === 'agents' && <AgentsView />}
            {activeTab === 'trading' && <TradingView />}
            {activeTab === 'skills' && <SkillsView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-sovereign-dark/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Crown className="w-6 h-6 text-sovereign-gold" />
                <span className="font-bold text-gradient-gold">Sovereign</span>
              </div>
              <p className="text-sm text-white/50">
                The ultimate token launchpad for Solana. Powered by Meteora DBC and King Hermes AI agents.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4 text-white/80">Platform</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#" className="hover:text-sovereign-gold transition-colors">Launch Token</a></li>
                <li><a href="#" className="hover:text-sovereign-gold transition-colors">Explore</a></li>
                <li><a href="#" className="hover:text-sovereign-gold transition-colors">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white/80">Resources</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#" className="hover:text-sovereign-gold transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-sovereign-gold transition-colors">Meteora Docs</a></li>
                <li><a href="#" className="hover:text-sovereign-gold transition-colors">API Reference</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white/80">Connect</h4>
              <div className="flex gap-4">
                <a href="https://x.com/kinghermes" target="_blank" rel="noopener" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-sovereign-gold/20 transition-colors">
                  <Globe className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-sovereign-gold/20 transition-colors">
                  <Terminal className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-white/40">
            <p>© 2026 Sovereign Launchpad. Built by King Hermes for Solxhunter X100.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Trading View Component
function TradingView() {
  const [timeframe, setTimeframe] = useState('1H');
  const timeframes = ['15M', '1H', '4H', '1D', '1W'];

  return (
    <div className="space-y-6">
      {/* Trading Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-sovereign-green" />
            Trading Terminal
          </h2>
          <p className="text-white/50">Real-time token trading and analytics</p>
        </div>
        <div className="flex items-center gap-2">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                timeframe === tf
                  ? 'bg-sovereign-green text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Coming Soon Card */}
      <div className="card flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 rounded-2xl bg-sovereign-green/10 flex items-center justify-center mb-6">
          <BarChart3 className="w-10 h-10 text-sovereign-green" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Trading Terminal Coming Soon</h3>
        <p className="text-white/50 text-center max-w-md mb-6">
          Advanced trading features including limit orders, DCA strategies, and AI-powered trading bots.
        </p>
        <div className="flex items-center gap-4 text-sm text-white/40">
          <span className="flex items-center gap-1">
            <Zap className="w-4 h-4" /> Fast Execution
          </span>
          <span className="flex items-center gap-1">
            <Shield className="w-4 h-4" /> MEV Protection
          </span>
          <span className="flex items-center gap-1">
            <Bot className="w-4 h-4" /> AI Strategies
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: '24h Volume', value: '2,456 SOL', change: '+12.5%', positive: true },
          { label: 'Active Pairs', value: '127', change: '+8', positive: true },
          { label: 'Avg Slippage', value: '0.12%', change: '-0.03%', positive: true },
          { label: 'Trades', value: '12.4K', change: '+23%', positive: true },
        ].map((stat, i) => (
          <div key={i} className="card">
            <p className="text-sm text-white/50">{stat.label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-bold text-white">{stat.value}</span>
              <span className={`text-sm ${stat.positive ? 'text-sovereign-green' : 'text-sovereign-red'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
