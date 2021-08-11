import { Router } from 'express';
import makeTop10CitiesCOVIDByStateController from '../factories/makeTop10CitiesCOVIDByStateController';

const routes = Router();

routes.get('/', async (request, response) => {
    const controller = makeTop10CitiesCOVIDByStateController();

    const top10Cities = await controller.handle(request);

    response.json({
        top10Cities,
    });
});

export default routes;
