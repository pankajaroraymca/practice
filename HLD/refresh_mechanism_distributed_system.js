// ----------------------------------------------------Question 1------------------------------------------------------

// There are 2 services in the system:
// 1. Zerodha Service: An API to create the order, An API to provide the access token.
// 2. Small case Service: Which is consuming Zerodha Service to create the order. 

// Now all users are using the Small case Service to create the order. The API requires the access token in headers to create the order.

// The access token is valid for 30 mins. The Small case Service is using the Zerodha Service to get the access token.
// Now how to implement the refresh token mechanism in this case?
// The small case service is distributed and has multiple instances running.

// Answer:

// To implement a refresh token mechanism in this scenario, we can follow these steps:

// Alright — let’s break it down so it’s clear how the leader is chosen and how the distributed lock works in your Node.js case.

// 1. What We’re Solving
// You have multiple service instances in different nodes.
// Only one node should refresh the Zerodha token (the “leader”).
// Other nodes should wait while leader refreshes.

// 2. Using Redis as Distributed Lock
// We can use the Redis SET command with NX (set if not exists) and EX (expiry) to create a lock.

// Lock properties:

// Key: zerodha_token_refresh_lock
// Value: Unique ID of the process (e.g., UUID or hostname)
// Expiry: A bit longer than the refresh time (e.g., 40 sec if token refresh takes 30 sec)

// If SETNX succeeds → you’re the leader.
// If it fails → someone else is leader, so you wait.

// 3. Pseudo-code in Node.js
// We’ll use ioredis for Redis connection.

const Redis = require("ioredis");
const { v4: uuidv4 } = require("uuid");

const redis = new Redis({ host: "localhost", port: 6379 });

const LOCK_KEY = "zerodha_token_refresh_lock";
const LOCK_EXPIRY = 40; // seconds

async function acquireLock() {
    const lockId = uuidv4(); // unique to this process
    const success = await redis.set(LOCK_KEY, lockId, "NX", "EX", LOCK_EXPIRY);
    return success ? lockId : null;
}

async function releaseLock(lockId) {
    const currentLockId = await redis.get(LOCK_KEY);
    if (currentLockId === lockId) {
        await redis.del(LOCK_KEY);
    }
}

async function refreshTokenIfNeeded() {
    const tokenData = JSON.parse(await redis.get("zerodha_token") || "{}");
    const now = Date.now();

    // Refresh 2 minutes before expiry
    if (!tokenData.expires_at || tokenData.expires_at - now < 120_000) {
        const lockId = await acquireLock();

        if (lockId) {
            console.log("I'm the leader, refreshing token...");

            // Update status to refreshing
            await redis.set("zerodha_token_status", "refreshing");

            // Call Zerodha API to generate new token
            const newToken = await generateNewTokenFromZerodha();

            await redis.set("zerodha_token", JSON.stringify({
                token: newToken,
                expires_at: now + 30 * 60 * 1000 // 30 mins
            }));

            // Reset status
            await redis.set("zerodha_token_status", "active");

            await releaseLock(lockId);
        } else {
            console.log("Another node is leader, waiting...");
            await waitUntilStatusActive();
        }
    }
}

async function waitUntilStatusActive() {
    while ((await redis.get("zerodha_token_status")) === "refreshing") {
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}

// Simulated API call
async function generateNewTokenFromZerodha() {
    await new Promise(resolve => setTimeout(resolve, 30000)); // simulate 30 sec delay
    return "new_access_token_" + Date.now();
}


// 4. How Leader is Chosen
// All nodes periodically check if token is near expiry.
// The first node to call acquireLock() and succeed becomes the leader.
// All other nodes fail to acquire lock → they see status = "refreshing" and just wait.

// 5. Why This Works
// SET NX EX ensures only one node can set the lock.
// Expiry ensures lock is freed if leader crashes.
// Lock value ensures only the owner can release it (avoids accidental unlock).
// Redis is fast enough for millions of reads/writes for token & status checks.

// NOte: It will work well for multiple instances of the Small case Service running in a distributed environment. and one redis instance is used to manage the lock and token state.
// But it will not work if the redis insatance is also distributed or if there are multiple redis instances. In that case, we need to use redlock

// The approach is simple. You will try to acquire a lock on all redis instanes. Let's say you have 5 redis insances, and you are able to get lock on majjority of them ( 3 or more), then you're a leader.
// If you are not able to get lock on majority of them, then you will wait for the leader to refresh the token and then you will use the token from redis.