import * as express from 'express'
import * as cors from 'cors';

import { connectToDb } from "./config/db";
import { route } from "./routes";
import { environmentContext } from './utils/environmentContext';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

// Create application
const app = express()

// Setup swagger for development only
if (!environmentContext.isProd()) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

// Enable cors
app.use(cors())

// Set up body parser to send/receive json
app.use(express.json());

// Connect to DB
connectToDb();

// Configure Routes
app.use(route);
app.use('/', (req, res) => res.send('API for the shorten URL service'));

export { app }