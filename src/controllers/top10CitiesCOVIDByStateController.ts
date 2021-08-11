import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';
import top10CitiesCOVIDByStateService from '../services/top10CitiesCOVIDByStateService';

class top10CitiesCOVIDByStateController implements Controller {
    constructor(
        private readonly top10CitiesCOVIDByStateServie: top10CitiesCOVIDByStateService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { state, dateStart, dateEnd } = httpRequest.query;

        // verify request

        const top10Cities = await this.top10CitiesCOVIDByStateServie.execute({
            state,
            dateStart,
            dateEnd,
        });

        return top10Cities;
    }
}

export default top10CitiesCOVIDByStateController;
