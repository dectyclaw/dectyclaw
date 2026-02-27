#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { program } = require('commander');

program
    .version('1.0.0')
    .description("Launch your agent's token via Clanker on the Base network")
    .option('-d, --developer <address>', 'Developer fee recipient address')
    .action((options) => {
        const configPath = path.join(process.cwd(), 'agent.json');
        if (!fs.existsSync(configPath)) {
            console.error('❌ Error: agent.json not found. Run `npx dacty-create <name>` first.');
            process.exit(1);
        }

        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        console.log(`[DACTYCLAW] Preparing Clanker launch for $${config.ticker} (${config.name})...`);

        let devAddress = options.developer;
        if (!devAddress) {
            console.log(`\n💡 No developer address provided, auto-filling with agent's wallet address.`);
            console.log(`💡 The agent (${config.address}) will receive the 80% trading fees.`);
            devAddress = config.address;
        } else {
            console.log(`💰 Developer fee recipient manually set to: ${devAddress}`);
        }

        console.log(`\n🚀 Ready to launch on Base!`);
        console.log(`Launch via Clanker smart contracts is currently a browser-based transaction.`);
        console.log(`\nClick the link below to deploy your token (Wallet: ${config.address}):`);

        // Simulate Clanker URL construction
        const clankerUrl = `https://clanker.world/deploy?name=${encodeURIComponent(config.name)}&symbol=${encodeURIComponent(config.ticker)}&dev=${devAddress}`;

        console.log(`\x1b[36m${clankerUrl}\x1b[0m\n`);
    });

program.parse(process.argv);
