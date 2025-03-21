import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';

import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// const orders = [
//   { id: 1, customerName: 'John Doe', totalAmount: 250, status: 'Pending', date: new Date('2025-03-10') },
//   { id: 2, customerName: 'Alice Smith', totalAmount: 120, status: 'Shipped', date: new Date('2025-03-09') },
//   { id: 3, customerName: 'Michael Johnson', totalAmount: 450, status: 'Delivered', date: new Date('2025-03-08') },
//   { id: 4, customerName: 'Emily Brown', totalAmount: 300, status: 'Pending', date: new Date('2025-03-07') },
//   { id: 5, customerName: 'David Wilson', totalAmount: 180, status: 'Canceled', date: new Date('2025-03-06') },
//   { id: 6, customerName: 'Sophia Martinez', totalAmount: 600, status: 'Shipped', date: new Date('2025-03-05') },
//   { id: 7, customerName: 'James Anderson', totalAmount: 75, status: 'Delivered', date: new Date('2025-03-04') },
//   { id: 8, customerName: 'Olivia Thomas', totalAmount: 220, status: 'Pending', date: new Date('2025-03-03') }
// ];


/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);


