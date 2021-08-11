/* eslint-disable no-console */
import express from 'express';
import routes from './routes';

const app = express();
const PORT = 3333;

app.use(routes);

app.listen(PORT, () =>
    console.log(`🤞️ It's running at: http://localhost:${PORT}`),
);
