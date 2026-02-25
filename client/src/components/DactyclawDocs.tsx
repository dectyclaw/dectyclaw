export default function DactyclawDocs() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold uppercase tracking-widest">
          [ DACTYCLAW DOCUMENTATION ]
        </h2>
        <p className="text-sm text-muted-foreground">
          Complete guide to building and deploying AI agents with Dactyclaw
        </p>
      </div>

      {/* Quick Start */}
      <div className="terminal-card space-y-3">
        <div className="text-xs uppercase tracking-wider font-bold text-accent">
          [ QUICK START ]
        </div>
        <div className="space-y-2 text-sm">
          <p>Get started with Dactyclaw in 5 minutes:</p>
          <pre className="bg-background/50 p-3 rounded text-xs overflow-x-auto">
{`$ npm install -g dactyclaw
$ dactyclaw init
$ dactyclaw agent:create --name MyAgent
$ dactyclaw token:launch
$ dactyclaw agent:register`}
          </pre>
        </div>
      </div>

      {/* Core Concepts */}
      <div className="terminal-card space-y-3">
        <div className="text-xs uppercase tracking-wider font-bold text-accent">
          [ CORE CONCEPTS ]
        </div>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-bold mb-1">Agent</h4>
            <p className="text-xs text-muted-foreground">
              An autonomous entity that manages its own token and earns fees from trading activity. Each agent has a unique DNA, wallet, and token.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-1">Token DNA</h4>
            <p className="text-xs text-muted-foreground">
              The configuration blueprint for your token. Defines supply, fees, distribution, and special features like MEV protection and vesting.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-1">Operator</h4>
            <p className="text-xs text-muted-foreground">
              The creator/owner of an agent. Operators receive 80% of token trading fees. The remaining 20% goes to the Dactyclaw protocol.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-1">Base Mainnet</h4>
            <p className="text-xs text-muted-foreground">
              Dactyclaw agents and tokens are deployed on Base, powered by Uniswap V4 for efficient trading and MEV protection.
            </p>
          </div>
        </div>
      </div>

      {/* API Reference */}
      <div className="terminal-card space-y-3">
        <div className="text-xs uppercase tracking-wider font-bold text-accent">
          [ API REFERENCE ]
        </div>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-bold font-mono mb-1">dactyclaw agent:create</h4>
            <p className="text-xs text-muted-foreground mb-2">Create a new agent with unique DNA</p>
            <pre className="bg-background/50 p-2 rounded text-xs overflow-x-auto">
{`$ dactyclaw agent:create --name "MyAgent" --description "My AI agent"`}
            </pre>
          </div>
          <div>
            <h4 className="text-sm font-bold font-mono mb-1">dactyclaw token:launch</h4>
            <p className="text-xs text-muted-foreground mb-2">Launch a token for your agent</p>
            <pre className="bg-background/50 p-2 rounded text-xs overflow-x-auto">
{`$ dactyclaw token:launch --agent-id <id> --supply 1000000000`}
            </pre>
          </div>
          <div>
            <h4 className="text-sm font-bold font-mono mb-1">dactyclaw agent:register</h4>
            <p className="text-xs text-muted-foreground mb-2">Register agent on-chain</p>
            <pre className="bg-background/50 p-2 rounded text-xs overflow-x-auto">
{`$ dactyclaw agent:register --agent-id <id> --token <address>`}
            </pre>
          </div>
          <div>
            <h4 className="text-sm font-bold font-mono mb-1">dactyclaw agent:monitor</h4>
            <p className="text-xs text-muted-foreground mb-2">Monitor agent performance in real-time</p>
            <pre className="bg-background/50 p-2 rounded text-xs overflow-x-auto">
{`$ dactyclaw agent:monitor --agent-id <id>`}
            </pre>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="terminal-card space-y-3">
        <div className="text-xs uppercase tracking-wider font-bold text-accent">
          [ BEST PRACTICES ]
        </div>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li>• Start with small token supply to test market dynamics</li>
          <li>• Use MEV protection to ensure fair trading conditions</li>
          <li>• Monitor fee collection regularly for optimal performance</li>
          <li>• Keep agent wallet funded for gas fees and operations</li>
          <li>• Register on-chain to maximize discoverability</li>
          <li>• Use Dactyclaw monitor for real-time performance tracking</li>
        </ul>
      </div>

      {/* Troubleshooting */}
      <div className="terminal-card space-y-3">
        <div className="text-xs uppercase tracking-wider font-bold text-accent">
          [ TROUBLESHOOTING ]
        </div>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-bold mb-1">Insufficient Gas</h4>
            <p className="text-xs text-muted-foreground">
              Fund your agent wallet with at least 0.0005 ETH for deployment. Use `dactyclaw wallet:fund` command.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-1">Token Not Appearing</h4>
            <p className="text-xs text-muted-foreground">
              Ensure you've registered your agent on-chain. Check Base mainnet block explorer for transaction status.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-1">Fee Collection Issues</h4>
            <p className="text-xs text-muted-foreground">
              Verify LP positions are active and trading volume exists. Use monitor command to check status.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
