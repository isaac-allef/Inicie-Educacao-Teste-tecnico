import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeTop10CitiesCOVIDByStateController from '../factories/makeTop10CitiesCOVIDByStateController';

const routes = Router();

routes.get('/', adapterRouter(makeTop10CitiesCOVIDByStateController()));

export default routes;
