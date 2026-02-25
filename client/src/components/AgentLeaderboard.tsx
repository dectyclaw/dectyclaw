import { AgentStats } from '@/hooks/useLiveAgentData';
import { ClawnchpadToken } from '@/lib/clawnchpadApi';

interface AgentLeaderboardProps {
  agents: AgentStats[] | ClawnchpadToken[];
}

function isClawnchpadToken(agent: any): agent is ClawnchpadToken {
  return 'symbol' in agent && 'mcap' in agent;
}

/**
 * Komponen untuk menampilkan top agents dengan statistik real-time
 */
export const AgentLeaderboard = ({ agents }: AgentLeaderboardProps) => {
  return (
    <div className="terminal-card space-y-2">
      <div className="text-xs uppercase tracking-wider font-bold mb-4 text-accent">
        [ TOP AGENTS ]
      </div>
      <div className="space-y-0">
        {agents.length === 0 ? (
          <div className="text-xs text-muted-foreground p-4">
            [ LOADING AGENT DATA... ]
          </div>
        ) : (
          agents.map((agent, idx) => {
            const isClawnch = isClawnchpadToken(agent);
            return (
              <div
                key={`${isClawnch ? agent.symbol : agent.name}-${idx}`}
                className="flex justify-between items-center text-xs py-2 px-2 border-b border-dashed border-accent/30 last:border-0 hover:bg-accent/5 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-muted-foreground w-6">
                    [{idx + 1}]
                  </span>
                  <div className="flex-1">
                    <div className="font-bold text-foreground">
                      {isClawnch ? `$${agent.symbol}` : agent.name}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {isClawnch ? agent.name : agent.activeTime}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-accent font-bold">
                      {isClawnch ? agent.price : agent.volume}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {isClawnch ? 'price' : 'volume'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={isClawnch 
                      ? agent.change.startsWith('+') 
                        ? 'text-green-400 font-bold' 
                        : 'text-red-400 font-bold'
                      : agent.status === 'ACTIVE' 
                        ? 'text-accent' 
                        : 'text-muted-foreground'}>
                      {isClawnch ? agent.change : agent.burned}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {isClawnch ? 'change' : 'burned'}
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`
                        text-xs font-bold uppercase tracking-wider px-2 py-1 rounded
                        ${isClawnch
                          ? 'bg-blue-500/20 text-blue-400'
                          : agent.status === 'ACTIVE'
                          ? 'bg-accent/20 text-accent'
                          : 'bg-muted/20 text-muted-foreground'
                        }
                      `}
                    >
                      {isClawnch ? agent.mcap : agent.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AgentLeaderboard;
