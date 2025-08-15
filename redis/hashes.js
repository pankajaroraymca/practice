const client = require('./client');

async function init(){
    const user = {
        name: "Bob",
        // The field of a Redis Hash key can only be a string.
        // We can write `age: 20` here but ioredis will convert it to a string anyway.
        age: "20",
        description: "I am a programmer",
      };
    
      await client.hset("user-hash", user);
    
      const name = await client.hget("user-hash", "name");
      console.log(name); // "Bob"
    
      const age = await client.hget("user-hash", "age");
      console.log(age); // "20"
    
      const all = await client.hgetall("user-hash");
      console.log(all); // { age: '20', name: 'Bob', description: 'I am a programmer' }
    
      // or `await redis.hdel("user-hash", "name", "description")`;
      await client.hdel("user-hash", ["name", "description"]);
    
      const exists = await client.hexists("user-hash", "name");
      console.log(exists); // 0 (means false, and if it's 1, it means true)
    
      await client.hincrby("user-hash", "age", 1);
      const newAge = await client.hget("user-hash", "age");
      console.log(newAge); // 21
    
      await client.hsetnx("user-hash", "age", 23);
      console.log(await client.hget("user-hash", "age")); // 21, as the field "age" already exists.

    
    
}

init()