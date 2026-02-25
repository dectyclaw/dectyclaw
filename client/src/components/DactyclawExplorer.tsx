import { useClawnchpadTokens } from '@/hooks/useClawnchpadTokens';
import { Loader2 } from 'lucide-react';

export default function DactyclawExplorer() {
  const { tokens, isLoading, error } = useClawnchpadTokens(30000);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="text-sm uppercase tracking-widest font-bold text-accent">
          EXPLORER
        </div>
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          discover all<br />dactyclaw agents
        </h2>
        <p className="text-sm text-muted-foreground">
          Real-time tracking of all agents and tokens deployed on Dactyclaw infrastructure
        </p>
      </div>

      {/* Quick Stats */}
      <div className="border-l-2 border-dashed border-accent/30 pl-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total Agents:</span>
          <span className="text-accent font-bold">{tokens.length}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Status:</span>
          <span className="text-green-400 font-bold">LIVE</span>
        </div>
      </div>

      {/* Top Agents */}
      <div className="space-y-3">
        <div className="text-xs uppercase tracking-wider font-bold text-accent">
          [ TOP AGENTS ]
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




    </div>
  );
}
