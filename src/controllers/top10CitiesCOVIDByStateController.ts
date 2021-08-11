import { MissingParamError } from '../handleErrors/errors/missingParamError';
import { badRequest, ok, serverError } from '../handleErrors/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';
import top10CitiesCOVIDByStateService from '../services/top10CitiesCOVIDByStateService';

class top10CitiesCOVIDByStateController implements Controller {
    constructor(
        private readonly top10CitiesCOVIDByStateServie: top10CitiesCOVIDByStateService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { state, dateStart, dateEnd } = httpRequest.query;

            if (!state) {
                return badRequest(new MissingParamError('state'));
            }

            if (!dateStart) {
                return badRequest(new MissingParamError('dateStart'));
            }

            if (!dateEnd) {
                return badRequest(new MissingParamError('dateEnd'));
            }

            // verify dates

            const top10Cities =
                await this.top10CitiesCOVIDByStateServie.execute({
                    state,
                    dateStart,
                    dateEnd,
                });

            return ok(top10Cities);
        } catch (err) {
            return serverError(err);
        }
    }
}

export default top10CitiesCOVIDByStateController;
