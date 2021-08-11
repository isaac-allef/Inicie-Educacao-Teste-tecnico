import Top10CitiesCOVIDByStateController from '../controllers/top10CitiesCOVIDByStateController';
import { Controller } from '../protocols/controller';
import SendTop10CitiesService from '../services/sendTop10CitiesService';
import Top10CitiesCOVIDByStateService from '../services/top10CitiesCOVIDByStateService';

const makeTop10CitiesCOVIDByStateController = (): Controller => {
    const top10CitiesCOVIDByStateService = new Top10CitiesCOVIDByStateService();
    const sendTop10CitiesService = new SendTop10CitiesService();

    return new Top10CitiesCOVIDByStateController(
        top10CitiesCOVIDByStateService,
        sendTop10CitiesService,
    );
};

export default makeTop10CitiesCOVIDByStateController;
