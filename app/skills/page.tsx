'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Code2, 
  Rocket, 
  Shield, 
  Database,
  Cpu,
  Globe,
  Zap,
  ChevronRight,
  ExternalLink,
  Copy,
  CheckCircle,
  Terminal,
  GitBranch,
  Layers
} from 'lucide-react';
import toast from 'react-hot-toast';

// Skills library
const SKILL_CATEGORIES = [
  {
    id: 'devops',
    name: 'DevOps',
    icon: Rocket,
    color: 'from-orange-500 to-red-500',
    skills: [
      { name: 'Vercel Deployment', description: 'Deploy Next.js apps to Vercel with custom domains', level: 'Intermediate' },
      { name: 'Docker Containers', description: 'Build and manage containerized applications', level: 'Advanced' },
      { name: 'GitHub Actions', description: 'CI/CD pipelines for automated testing and deployment', level: 'Intermediate' },
    ]
  },
  {
    id: 'blockchain',
    name: 'Blockchain',
    icon: Database,
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'Solana Development', description: 'Build programs with Anchor framework', level: 'Advanced' },
      { name: 'Token Launchpad', description: 'Create bonding curve tokens with Meteora', level: 'Intermediate' },
      { name: 'Wallet Integration', description: 'Connect Phantom, Solflare, and other wallets', level: 'Beginner' },
    ]
  },
  {
    id: 'ai-agents',
    name: 'AI Agents',
    icon: Cpu,
    color: 'from-cyan-500 to-blue-500',
    skills: [
      { name: 'Agent Orchestration', description: 'Coordinate multiple AI agents in parallel', level: 'Advanced' },
      { name: 'Claude Code CLI', description: 'Use Claude Code for autonomous coding', level: 'Intermediate' },
      { name: 'Multi-Agent Systems', description: 'Build systems with specialized agent teams', level: 'Advanced' },
    ]
  },
  {
    id: 'security',
    name: 'Security',
    icon: Shield,
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Smart Contract Audit', description: 'Review Solana programs for vulnerabilities', level: 'Advanced' },
      { name: 'Environment Management', description: 'Secure handling of API keys and secrets', level: 'Intermediate' },
      { name: 'Rate Limiting', description: 'Protect APIs from abuse and attacks', level: 'Intermediate' },
    ]
  },
];

// Example skill code
const EXAMPLE_SKILL = `---
name: token-launchpad-skill
version: 1.0.0
description: Launch tokens on Meteora DBC with one command
author: King Hermes
---

# Prerequisites
- Solana wallet with devnet SOL
- Cloudflare R2 credentials
- Meteora pool config key

# Installation
\`\`\`bash
npm install @meteora-ag/dynamic-bonding-curve-sdk
\`\`\`

# Usage
\`\`\`typescript
import { createPool } from '@meteora-ag/dynamic-bonding-curve-sdk';

const result = await createPool({
  tokenName: "My Token",
  tokenSymbol: "MTK",
  // ... other params
});
\`\`\`

# Environment Variables
\`\`\`env
RPC_URL=https://api.devnet.solana.com
POOL_CONFIG_KEY=your_config_key
\`\`\`
`;

export default function SkillsView() {
  const [selectedCategory, setSelectedCategory] = useState('blockchain');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EXAMPLE_SKILL);
    setCopied(true);
    toast.success('Skill template copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-sovereign-cyan" />
          Skills Library
        </h2>
        <p className="text-white/50 mt-2">
          Reusable skill templates and best practices for building with King Hermes
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {SKILL_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                selectedCategory === cat.id
                  ? `bg-gradient-to-r ${cat.color} text-black`
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SKILL_CATEGORIES.find(c => c.id === selectedCategory)?.skills.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card hover:border-sovereign-cyan/30 group"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-white group-hover:text-sovereign-cyan transition-colors">
                {skill.name}
              </h3>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                skill.level === 'Beginner' ? 'bg-sovereign-green/20 text-sovereign-green' :
                skill.level === 'Intermediate' ? 'bg-sovereign-gold/20 text-sovereign-gold' :
                'bg-sovereign-red/20 text-sovereign-red'
              }`}>
                {skill.level}
              </span>
            </div>
            <p className="text-sm text-white/60 mb-4">{skill.description}</p>
            <button className="flex items-center gap-1 text-sm text-sovereign-cyan hover:gap-2 transition-all">
              Learn more
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Skill Template Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-sovereign-gold" />
            <h3 className="text-lg font-bold text-white">Example Skill Template</h3>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 transition-all"
          >
            {copied ? <CheckCircle className="w-4 h-4 text-sovereign-green" /> : <Copy className="w-4 h-4" />}
            <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        <div className="bg-sovereign-darker rounded-xl p-4 border border-white/10 overflow-x-auto">
          <pre className="text-sm font-mono text-white/70 whitespace-pre">
            {EXAMPLE_SKILL}
          </pre>
        </div>

        <p className="mt-4 text-sm text-white/50">
          Use this template to create your own reusable skills. Share them with the community!
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a 
          href="https://github.com/Maliot100X/The-Supreme-Agent-Orchestrator/tree/main/skills" 
          target="_blank" 
          rel="noopener"
          className="card flex items-center gap-4 hover:border-sovereign-gold/50 group"
        >
          <div className="w-12 h-12 rounded-xl bg-sovereign-gold/10 flex items-center justify-center group-hover:bg-sovereign-gold/20 transition-colors">
            <GitBranch className="w-6 h-6 text-sovereign-gold" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-white group-hover:text-sovereign-gold transition-colors">
              Skill Repository
            </h4>
            <p className="text-sm text-white/50">Browse and contribute skills on GitHub</p>
          </div>
          <ExternalLink className="w-5 h-5 text-white/30 group-hover:text-sovereign-gold" />
        </a>

        <a 
          href="#" 
          className="card flex items-center gap-4 hover:border-sovereign-cyan/50 group"
        >
          <div className="w-12 h-12 rounded-xl bg-sovereign-cyan/10 flex items-center justify-center group-hover:bg-sovereign-cyan/20 transition-colors">
            <Layers className="w-6 h-6 text-sovereign-cyan" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-white group-hover:text-sovereign-cyan transition-colors">
              Skill Marketplace
            </h4>
            <p className="text-sm text-white/50">Discover skills from the community</p>
          </div>
          <ExternalLink className="w-5 h-5 text-white/30 group-hover:text-sovereign-cyan" />
        </a>
      </div>

      {/* Getting Started */}
      <div className="card border-sovereign-gold/30 bg-sovereign-gold/5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-sovereign-gold/20 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-sovereign-gold" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Getting Started</h3>
            <ol className="space-y-2 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-sovereign-gold/20 text-sovereign-gold text-xs flex items-center justify-center font-bold">1</span>
                Clone the King Hermes repository
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-sovereign-gold/20 text-sovereign-gold text-xs flex items-center justify-center font-bold">2</span>
                Install dependencies with npm install
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-sovereign-gold/20 text-sovereign-gold text-xs flex items-center justify-center font-bold">3</span>
                Copy skill templates from the skills/ directory
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-sovereign-gold/20 text-sovereign-gold text-xs flex items-center justify-center font-bold">4</span>
                Deploy your first token launchpad!
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
