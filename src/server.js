import pino from 'pino-http';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mainRouter from './routers/index.js'; //Since we export the router using export default, we can import it with any name
import { env } from './utils/env.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

// const PORT = Number(process.env.PORT);
const PORT = Number(env('PORT', '3000'));

export function setupServer() {
  const app = express();
  app.use(cookieParser());
  // app.use(express.json());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  // CORS middleware
  app.use(cors());

  app.use(mainRouter);

  app.use(errorHandler);

  app.use('*', notFoundHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
