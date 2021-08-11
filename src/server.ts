/* eslint-disable no-console */
import express from 'express';
import 'express-async-errors';
import * as dotenv from 'dotenv';

import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3333;

app.use(routes);
app.use(express.json());

app.listen(port, () =>
    console.log(`🤞️ It's running at: http://localhost:${port}`),
);
