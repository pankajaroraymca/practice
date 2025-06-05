import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(
    process.cwd(),
    `.env.${process.env.NODE_ENV}` // Dynmaically load the file, we have injected NODE_ENV variable when starting the server.
  ),
});
console.log("Environment variables loaded from .env file", process.env.NODE_ENV);


import app from './app';


const PORT = process.env.PORT

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, ()=>{
    console.log(`server is runnings at http://localhost:${PORT}`);
})
