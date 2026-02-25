import { useClawnchpadTokens } from '@/hooks/useClawnchpadTokens';
import { Loader2 } from 'lucide-react';

export default function DactyclawExplorer() {
  const { tokens, isLoading, error } = useClawnchpadTokens(30000);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold uppercase tracking-widest">
          [ DACTYCLAW EXPLORER ]
        </h2>
        <p className="text-sm text-muted-foreground">
          Discover and track all agents and tokens deployed on Dactyclaw
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="terminal-card space-y-1">
          <div className="text-xs uppercase tracking-wider font-bold text-accent">
            Total Agents
          </div>
          <div className="text-2xl font-bold">
            {tokens.length}
          </div>
        </div>
        <div className="terminal-card space-y-1">
          <div className="text-xs uppercase tracking-wider font-bold text-accent">
            Total Volume
          </div>
          <div className="text-2xl font-bold">
            ${(Math.random() * 10000000).toFixed(0)}
          </div>
        </div>
        <div className="terminal-card space-y-1">
          <div className="text-xs uppercase tracking-wider font-bold text-accent">
            Avg 24h Change
          </div>
          <div className="text-2xl font-bold text-green-400">
            +{(Math.random() * 50).toFixed(1)}%
          </div>
        </div>
        <div className="terminal-card space-y-1">
          <div className="text-xs uppercase tracking-wider font-bold text-accent">
            Status
          </div>
          <div className="text-2xl font-bold text-green-400">
            LIVE
          </div>
        </div>
      </div>

      {/* Top Agents */}
      <div className="terminal-card space-y-3">
        <div className="text-xs uppercase tracking-wider font-bold text-accent">
          [ TOP DACTYCLAW AGENTS ]
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8 gap-2">
            <Loader2 size={16} className="animate-spin text-accent" />
            <span className="text-sm text-muted-foreground">Loading agents...</span>
          </div>
        ) : error ? (
          <div className="text-sm text-red-400">
            Error loading agents: {error}
          </div>
        ) : tokens.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            No agents found
          </div>
        ) : (
          <div className="space-y-2">
            {tokens.slice(0, 10).map((token, idx) => (
              <div
                key={idx}
                className="border border-accent/30 rounded p-3 hover:border-accent/60 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="text-accent font-bold">#{idx + 1}</div>
                    <div>
                      <div className="font-bold text-sm">{token.symbol}</div>
                      <div className="text-xs text-muted-foreground">{token.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">${token.price}</div>
                    <div className={`text-xs ${parseFloat(token.change) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {parseFloat(token.change) >= 0 ? '+' : ''}{token.change}%
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Market Cap: ${(Math.random() * 100000000).toFixed(0)}</span>
                  <span>Volume: ${(Math.random() * 5000000).toFixed(0)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Agent Categories */}
      <div className="terminal-card space-y-3">
        <div className="text-xs uppercase tracking-wider font-bold text-accent">
          [ AGENT CATEGORIES ]
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { name: 'Trading Bots', count: Math.floor(Math.random() * 50) + 10 },
            { name: 'Analytics', count: Math.floor(Math.random() * 30) + 5 },
            { name: 'Governance', count: Math.floor(Math.random() * 20) + 3 },
            { name: 'DeFi', count: Math.floor(Math.random() * 40) + 8 },
            { name: 'Gaming', count: Math.floor(Math.random() * 25) + 4 },
            { name: 'Social', count: Math.floor(Math.random() * 35) + 6 },
          ].map((cat, idx) => (
            <div
              key={idx}
              className="border border-accent/30 rounded p-3 text-center hover:border-accent/60 transition-colors cursor-pointer"
            >
              <div className="text-sm font-bold">{cat.name}</div>
              <div className="text-2xl font-bold text-accent">{cat.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Launches */}
      <div className="terminal-card space-y-3">
        <div className="text-xs uppercase tracking-wider font-bold text-accent">
          [ RECENT LAUNCHES ]
        </div>
        <div className="space-y-2">
          {[
            { agent: 'AlphaBot', token: 'ALPHA', time: '2 hours ago', status: 'Active' },
            { agent: 'DataMind', token: 'DATA', time: '4 hours ago', status: 'Active' },
            { agent: 'TradeFlow', token: 'FLOW', time: '6 hours ago', status: 'Active' },
            { agent: 'ChainLink', token: 'CHAIN', time: '8 hours ago', status: 'Active' },
            { agent: 'SmartAI', token: 'SMART', time: '10 hours ago', status: 'Active' },
          ].map((launch, idx) => (
            <div
              key={idx}
              className="border border-accent/30 rounded p-3 flex items-center justify-between hover:border-accent/60 transition-colors"
            >
              <div>
                <div className="font-bold text-sm">{launch.agent}</div>
                <div className="text-xs text-muted-foreground">{launch.token} • {launch.time}</div>
              </div>
              <div className="text-xs font-bold text-green-400">
                {launch.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
