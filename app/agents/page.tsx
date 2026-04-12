'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Cpu, 
  Zap, 
  Shield, 
  Terminal, 
  Code2, 
  Globe, 
  Search,
  Activity,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Play,
  Pause,
  Settings,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Agent definitions
const AGENTS = [
  {
    id: 'openclaude',
    name: 'OpenClaude',
    status: 'online',
    model: 'Kimi K2.5 Turbo',
    provider: 'Fireworks AI',
    description: 'Primary architect and code generator. Excels at system design, architecture, and complex implementation tasks.',
    capabilities: ['Code Generation', 'Architecture Design', 'Debugging', 'Refactoring'],
    stats: {
      tasksCompleted: 1427,
      successRate: '98.5%',
      avgResponseTime: '1.2s',
    },
    icon: '🧠',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    status: 'online',
    model: 'minimax-m2',
    provider: 'Ollama Cloud',
    description: 'Security-focused code reviewer. Analyzes for vulnerabilities, best practices, and optimization opportunities.',
    capabilities: ['Security Audit', 'Code Review', 'Vulnerability Detection', 'Optimization'],
    stats: {
      tasksCompleted: 892,
      successRate: '99.1%',
      avgResponseTime: '0.8s',
    },
    icon: '🛡️',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    status: 'online',
    model: 'Gemini Pro',
    provider: 'Google AI',
    description: 'Research specialist. Gathers information, analyzes trends, and provides strategic insights.',
    capabilities: ['Research', 'Data Analysis', 'Market Intelligence', 'Documentation'],
    stats: {
      tasksCompleted: 2156,
      successRate: '97.8%',
      avgResponseTime: '1.5s',
    },
    icon: '🔬',
    color: 'from-blue-500 to-cyan-500',
  },
];

// Example commands
const EXAMPLE_COMMANDS = [
  { command: '@openclaude Create a token launchpad with Meteora integration', agent: 'openclaude' },
  { command: '@opencode Review this smart contract for vulnerabilities', agent: 'opencode' },
  { command: '@gemini Research the latest Solana DeFi trends', agent: 'gemini' },
  { command: '@all Build a complete trading bot system', agent: 'all' },
];

export default function AgentsView() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [commandInput, setCommandInput] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <Bot className="w-8 h-8 text-sovereign-purple" />
          AI Agents
        </h2>
        <p className="text-white/50 mt-2">
          Three specialized agents working together to build, secure, and research
        </p>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {AGENTS.map((agent) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
            className={`card cursor-pointer relative overflow-hidden group ${
              selectedAgent === agent.id ? 'border-sovereign-gold/50' : ''
            }`}
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${agent.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
            
            {/* Status Indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                agent.status === 'online' ? 'bg-sovereign-green animate-pulse' : 'bg-sovereign-red'
              }`} />
              <span className="text-xs text-white/50 uppercase">{agent.status}</span>
            </div>

            {/* Content */}
            <div className="relative">
              <div className="text-4xl mb-4">{agent.icon}</div>
              <h3 className="text-xl font-bold text-white mb-1">{agent.name}</h3>
              <p className="text-sm text-white/40 mb-3">{agent.model}</p>
              <p className="text-sm text-white/60 line-clamp-2">{agent.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/10">
                <div className="text-center">
                  <p className="text-lg font-bold text-white">{agent.stats.tasksCompleted}</p>
                  <p className="text-xs text-white/40">Tasks</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-sovereign-green">{agent.stats.successRate}</p>
                  <p className="text-xs text-white/40">Success</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-white">{agent.stats.avgResponseTime}</p>
                  <p className="text-xs text-white/40">Response</p>
                </div>
              </div>
            </div>

            {/* Expanded View */}
            {selectedAgent === agent.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-white/10"
              >
                <h4 className="text-sm font-semibold text-white/70 mb-2">Capabilities</h4>
                <div className="flex flex-wrap gap-2">
                  {agent.capabilities.map((cap, i) => (
                    <span 
                      key={i}
                      className="px-2 py-1 rounded-lg bg-white/5 text-white/70 text-xs"
                    >
                      {cap}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="flex-1 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/15 transition-all flex items-center justify-center gap-2">
                    <Terminal className="w-4 h-4" />
                    Test Agent
                  </button>
                  <button className="flex-1 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/15 transition-all flex items-center justify-center gap-2">
                    <Settings className="w-4 h-4" />
                    Configure
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Command Interface */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Terminal className="w-5 h-5 text-sovereign-gold" />
          <h3 className="text-lg font-bold text-white">Command Interface</h3>
        </div>

        <div className="bg-sovereign-darker rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-sovereign-gold font-mono">$</span>
            <input
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              placeholder="Enter command or @mention an agent..."
              className="flex-1 bg-transparent text-white placeholder:text-white/30 focus:outline-none font-mono"
            />
            <button className="px-4 py-2 rounded-lg bg-sovereign-gold text-black font-semibold text-sm hover:shadow-lg hover:shadow-sovereign-gold/30 transition-all flex items-center gap-2">
              <Play className="w-4 h-4" />
              Run
            </button>
          </div>
        </div>

        {/* Quick Commands */}
        <div className="mt-4">
          <p className="text-sm text-white/50 mb-3">Example commands:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {EXAMPLE_COMMANDS.map((cmd, i) => (
              <button
                key={i}
                onClick={() => setCommandInput(cmd.command)}
                className="text-left px-3 py-2 rounded-lg bg-white/5 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all flex items-center gap-2"
              >
                <ChevronRight className="w-4 h-4 text-sovereign-gold" />
                {cmd.command}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Agents', value: '3', icon: Bot, color: 'text-sovereign-purple' },
          { label: 'Tasks Today', value: '47', icon: CheckCircle, color: 'text-sovereign-green' },
          { label: 'Avg Latency', value: '1.1s', icon: Zap, color: 'text-sovereign-gold' },
          { label: 'Queue Depth', value: '0', icon: Activity, color: 'text-sovereign-cyan' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="card flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/50">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Documentation Card */}
      <div className="card">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-sovereign-gold/10 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-sovereign-gold" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2">Build with King Hermes Agents</h3>
            <p className="text-white/60 mb-4">
              Use our AI agents in your own projects. Deploy OpenClaude, OpenCode, and Gemini to build 
              your own autonomous systems.
            </p>
            <div className="flex flex-wrap gap-3">
              <a 
                href="https://github.com/Maliot100X/The-Supreme-Agent-Orchestrator" 
                target="_blank" 
                rel="noopener"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/15 transition-all"
              >
                <Code2 className="w-4 h-4" />
                GitHub Repository
              </a>
              <a 
                href="#" 
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/15 transition-all"
              >
                <Globe className="w-4 h-4" />
                Documentation
              </a>
              <a 
                href="#" 
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/15 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                Discord Community
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
