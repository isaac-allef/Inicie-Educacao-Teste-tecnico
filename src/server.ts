/* eslint-disable no-console */
import express from 'express';
import 'express-async-errors';

import routes from './routes';

const app = express();
const PORT = 3333;

app.use(routes);
app.use(express.json());

app.listen(PORT, () =>
    console.log(`🤞️ It's running at: http://localhost:${PORT}`),
);
