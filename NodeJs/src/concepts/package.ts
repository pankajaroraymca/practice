//  --------------------------------package.json ------------------------------------

// This is the manifest file for your Node.js project. It defines:

// 1) Project metadata:
// name, version, description, author, etc.

// 2) Scripts: Custom commands you can run with npm run:

const scripts = {
  "start": "node dist/index.js",
  "dev": "nodemon"
}
// 3)Dependencies: All external libraries your project needs to run:

const dependencies = {
  "express": "^4.18.2"
}

// 4) Dev Dependencies: Tools needed only for development, not in production:

const devDependencies =  {
  "typescript": "^5.2.2",
  "nodemon": "^2.0.22"
}

// -------------------------------package-lock.json ----------------------------------

// This is the exact dependency snapshot of your project. It records:

// 1) Exact versions of every installed package and sub-package (even transitive dependencies).
// 2) Resolved URLs for each package (e.g., from the npm registry).
// 3) Integrity hashes to ensure the code hasn't been tampered with.

// Note: If i do  "express": "5.1.0" , will lock file required? Yes because express js also has sub dependecy and lock file also locks the version of sub depencies. So you will have the same 
// depenciency code always.