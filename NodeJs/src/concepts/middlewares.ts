// What are middlewares?
// They are functions in express js that has access to req res and next middleware function in the req-res lifecycle.

// What they can do?
// 1) They can modify the req and response.
// 2) They can end the req res lifecycle.
// 3) They can execute any sort of code.
// 4) They can calls the next middleware in the cycle.

// why you should use middlewares?
// 1) Separation of concern ( like logging, authentication, error handling etc.)
// 2) Reusable Code.
// 3) Maintainable and clean code.

// Types of middlewares. They are categorized based on their usage.

// 1) Application level middleware - they are implemented in an entire application/
// code -  app.use(). E.g app.use(express.json())

// 2) Router level middleware - They are implemented at specifc routers
// code - router.use()
// E.g 
// router.use((req, res, next) => {
//   console.log('Router middleware');
//   next();
// });

// 3) Error handling middleware - These middleware functions accept 4 arguements. err, req, res, next
// code - app.use()
// Note - This middleware only runs when next(err) is called.

// 4) Built in middleware: - 
// express.json - used to parse the incoming json from req.
// express.static  -  used to serve the static files.
// express.urlencoded - use to Parses URL-encoded payloads.

// 5) Custom Middlewares

// 6) Third party middlewares - cors, cookie parsor, helmet.