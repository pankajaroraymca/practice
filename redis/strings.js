const client = require('./client');

async function init(){
    await client.set('zerodha_token_status', 'active');
    console.log('Redis client initialized and zerodha_token_status set to active');

    // Set an expiry for the status key
    await client.expire('zerodha_token_status', 60); // Set expiry to 1 min

    const tokenData = await client.get('zerodha_token_status');
    console.log('Current zerodha_token_status:', tokenData);
    
}

init()