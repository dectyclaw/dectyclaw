const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 8091;

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Master-Key',
};

function safeHeaders(proxyResHeaders) {
    const safe = { ...proxyResHeaders };
    // Forcefully remove any existing access-control headers from the destination
    for (const key of Object.keys(safe)) {
        if (key.toLowerCase().startsWith('access-control-')) {
            delete safe[key];
        }
    }
    // Remove strict transport security, frame options or anything that could block rendering
    delete safe['strict-transport-security'];
    delete safe['x-frame-options'];
    delete safe['content-security-policy'];
    return safe;
}

const server = http.createServer((req, res) => {
    // Handle Preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204, corsHeaders);
        res.end();
        return;
    }

    const reqUrl = url.parse(req.url, true);

    // Proxy specifically for clawn.ch api
    if (reqUrl.pathname.startsWith('/api/')) {
        const targetUrl = 'https://clawn.ch' + req.url;
        
        console.log(`Proxying request to: ${targetUrl}`);

        https.get(targetUrl, (proxyRes) => {
            const outHeaders = { ...safeHeaders(proxyRes.headers), ...corsHeaders };
            res.writeHead(proxyRes.statusCode, outHeaders);
            proxyRes.pipe(res);
        }).on('error', (err) => {
            console.error(`Proxy error: ${err.message}`);
            res.writeHead(500, corsHeaders);
            res.end(JSON.stringify({ error: err.message }));
        });
    } else if (reqUrl.pathname.startsWith('/jsonbin/')) {
        // Ex: /jsonbin/69a2ff58d0ea881f40e21084
        const binId = reqUrl.pathname.replace('/jsonbin/', '');
        const targetUrl = `https://api.jsonbin.io/v3/b/${binId}`;
        
        console.log(`Proxying JSONBin request to: ${targetUrl}`);

        // DECTYCLAW Master Key required for reading this Bin
        const apiKey = '$2a$10$52cNICm.70qXCx0qkKBG5erLYGg1HMceR1gT4OOPOe5uzCiAJShOG';

        https.get(targetUrl, { headers: { 'X-Master-Key': apiKey } }, (proxyRes) => {
            const outHeaders = { ...safeHeaders(proxyRes.headers), ...corsHeaders };
            res.writeHead(proxyRes.statusCode, outHeaders);
            proxyRes.pipe(res);
        }).on('error', (err) => {
            console.error(`JSONBin Proxy error: ${err.message}`);
            res.writeHead(500, corsHeaders);
            res.end(JSON.stringify({ error: err.message }));
        });
    } else {
        res.writeHead(404, corsHeaders);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`CORS Proxy running on http://localhost:${PORT}`);
    console.log(`Example: http://localhost:${PORT}/api/count`);
});
