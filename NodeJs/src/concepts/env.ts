// How different envs are loaded when runnning server is different envrinment

import dotenv from 'dotenv';
import path from 'path';


// 1) Install any env library which can load files dynamically based on path. Here i will use dotenv.
// 2) When running server, inject he variable in system like NODE_ENV=dev. Add this command in script in package.json
// 3) Use cross-env lib because different os have different way of injecting variables. In Linux/macos we can simple use NODE_ENV=dev, but in windows set NODE_ENV=production.

const script = {
    dev: "cross-env NODE_ENV=dev ts-node-dev src/index.ts",
    uat: "cross-env NODE_ENV=uat ts-node-dev src/index.ts"
}
// 4) Load correct .env file based on NODE_ENV

dotenv.config({
  path: path.resolve(
    process.cwd(),
    `.env.${process.env.NODE_ENV || 'development'}`
  ),
});

// 5) Now, when you load any variable using process.env.any, the variable is loaded from that file whose path is resolved.

// Note: In dev, we are using nodemon for watch purposes. It support hot reload. 

