import { InvalidParamError } from '../handleErrors/errors/InvalidParamError';
import { MissingParamError } from '../handleErrors/errors/missingParamError';
import { badRequest, ok, serverError } from '../handleErrors/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';
import sendTop10CitiesService from '../services/sendTop10CitiesService';
import top10CitiesCOVIDByStateService from '../services/top10CitiesCOVIDByStateService';

class top10CitiesCOVIDByStateController implements Controller {
    constructor(
        private readonly top10CitiesCOVIDByStateServie: top10CitiesCOVIDByStateService,
        private readonly sendTop10CitiesServie: sendTop10CitiesService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { state } = httpRequest.query;
            let { dateStart, dateEnd } = httpRequest.query;

            if (!state) {
                return badRequest(new MissingParamError('state'));
            }

            if (!dateStart) {
                return badRequest(new MissingParamError('dateStart'));
            }

            if (!dateEnd) {
                return badRequest(new MissingParamError('dateEnd'));
            }

            const validStatesArray = [
                'AC',
                'AL',
                'AP',
                'AM',
                'BA',
                'CE',
                'DF',
                'ES',
                'GO',
                'MA',
                'MT',
                'MS',
                'MG',
                'PA',
                'PB',
                'PR',
                'PE',
                'PI',
                'RJ',
                'RN',
                'RS',
                'RO',
                'RR',
                'SC',
                'SP',
                'SE',
                'TO',
            ];

            if (!validStatesArray.includes(state.toUpperCase())) {
                return badRequest(new InvalidParamError('state not valid'));
            }

            dateStart = new Date(dateStart);
            dateEnd = new Date(dateEnd);

            if (dateStart.toString() === 'Invalid Date') {
                return badRequest(new InvalidParamError('dateStart'));
            }

            if (dateEnd.toString() === 'Invalid Date') {
                return badRequest(new InvalidParamError('dateEnd'));
            }

            if (dateStart.getTime() > dateEnd.getTime()) {
                return badRequest(
                    new InvalidParamError(
                        'dateStart cannot be greater than dateEnd',
                    ),
                );
            }

            const top10Cities =
                await this.top10CitiesCOVIDByStateServie.execute({
                    state,
                    dateStart,
                    dateEnd,
                });

            await this.sendTop10CitiesServie.execute(top10Cities);

            return ok(top10Cities);
        } catch (err) {
            return serverError(err);
        }
    }
}

export default top10CitiesCOVIDByStateController;
