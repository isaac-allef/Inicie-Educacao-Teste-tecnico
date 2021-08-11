import Top10CitiesCOVIDByStateController from '../controllers/top10CitiesCOVIDByStateController';
import { Controller } from '../protocols/controller';
import Top10CitiesCOVIDByStateService from '../services/top10CitiesCOVIDByStateService';

const makeTop10CitiesCOVIDByStateController = (): Controller => {
    const top10CitiesCOVIDByStateService = new Top10CitiesCOVIDByStateService();

    return new Top10CitiesCOVIDByStateController(
        top10CitiesCOVIDByStateService,
    );
};

export default makeTop10CitiesCOVIDByStateController;
