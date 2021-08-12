/* eslint-disable @typescript-eslint/no-explicit-any */
import Top10CitiesCOVIDByStateController from '../src/controllers/top10CitiesCOVIDByStateController';
import { InvalidParamError } from '../src/handleErrors/errors/InvalidParamError';
import { MissingParamError } from '../src/handleErrors/errors/missingParamError';
import { ok, serverError } from '../src/handleErrors/httpHelder';
import { HttpRequest } from '../src/protocols/http';
import SendTop10CitiesService from '../src/services/sendTop10CitiesService';
import Top10CitiesCOVIDByStateService from '../src/services/top10CitiesCOVIDByStateService';

const makeFakeRequest = (): HttpRequest => ({
    query: {
        state: 'PR',
        dateStart: '2020-05-10',
        dateEnd: '2020-05-18',
    },
});

const makeFakeReturnTop10Cities = (): Array<any> => {
    return [
        {
            id: 1,
            name: 'Santo Antônio do Caiuá',
            percentageOfCases: 0.7235338918507236,
        },
    ];
};

interface SutTypes {
    sut: Top10CitiesCOVIDByStateController;
    top10CitiesCOVIDByStateServiceStub: Top10CitiesCOVIDByStateService;
    sendTop10CitiesServiceStub: SendTop10CitiesService;
}

const makeSut = (): SutTypes => {
    const top10CitiesCOVIDByStateServiceStub =
        new Top10CitiesCOVIDByStateService();
    const sendTop10CitiesServiceStub = new SendTop10CitiesService();
    const sut = new Top10CitiesCOVIDByStateController(
        top10CitiesCOVIDByStateServiceStub,
        sendTop10CitiesServiceStub,
    );

    return {
        sut,
        top10CitiesCOVIDByStateServiceStub,
        sendTop10CitiesServiceStub,
    };
};

describe('Top 10 Cities COVID By State Controller', () => {
    test('Should return 400 if no state is provided', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            query: {
                dateStart: '2020-05-10',
                dateEnd: '2020-05-18',
            },
        };
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('state'));
    });

    test('Should return 400 if no dateStart is provided', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            query: {
                state: 'PR',
                dateEnd: '2020-05-18',
            },
        };
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('dateStart'));
    });

    test('Should return 400 if no dateEnd is provided', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            query: {
                state: 'PR',
                dateStart: '2020-05-10',
            },
        };
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('dateEnd'));
    });

    test('Should return 400 if state param is not valid', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            query: {
                state: 'AB',
                dateStart: '2020-05-10',
                dateEnd: '2020-05-18',
            },
        };
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(
            new InvalidParamError('state not valid'),
        );
    });

    test('Should return 400 if dateStart param is not a valid date', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            query: {
                state: 'PR',
                dateStart: 'abcd',
                dateEnd: '2020-05-18',
            },
        };
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('dateStart'));
    });

    test('Should return 400 if dateEnd param is not a valid date', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            query: {
                state: 'PR',
                dateStart: '2020-05-10',
                dateEnd: 'abcd',
            },
        };
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('dateEnd'));
    });

    test('Should return 400 if dateEnd is greater than dateStart', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            query: {
                state: 'PR',
                dateStart: '2020-05-18',
                dateEnd: '2020-05-10',
            },
        };
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(
            new InvalidParamError('dateStart cannot be greater than dateEnd'),
        );
    });

    test('Should call top10CitiesCOVIDByStateServie with corret values', async () => {
        const { sut, top10CitiesCOVIDByStateServiceStub } = makeSut();
        const top10spy = jest.spyOn(
            top10CitiesCOVIDByStateServiceStub,
            'execute',
        );
        await sut.handle(makeFakeRequest());
        expect(top10spy).toHaveBeenCalledWith({
            state: 'PR',
            dateStart: new Date('2020-05-10'),
            dateEnd: new Date('2020-05-18'),
        });
    });

    test('Should call sendTop10CitiesServie with corret values', async () => {
        const {
            sut,
            top10CitiesCOVIDByStateServiceStub,
            sendTop10CitiesServiceStub,
        } = makeSut();
        jest.spyOn(
            top10CitiesCOVIDByStateServiceStub,
            'execute',
        ).mockReturnValueOnce(
            new Promise(resolve => resolve(makeFakeReturnTop10Cities())),
        );
        const sendSpy = jest
            .spyOn(sendTop10CitiesServiceStub, 'execute')
            .mockReturnValueOnce(new Promise(resolve => resolve(true)));
        await sut.handle(makeFakeRequest());
        expect(sendSpy).toHaveBeenCalledWith(makeFakeReturnTop10Cities());
    });

    test('Should return 500 if top10CitiesCOVIDByStateServie throws', async () => {
        const { sut, top10CitiesCOVIDByStateServiceStub } = makeSut();
        jest.spyOn(
            top10CitiesCOVIDByStateServiceStub,
            'execute',
        ).mockImplementationOnce(() => {
            throw new Error('any error');
        });
        const httpResponse = await sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual(serverError(new Error()));
    });

    test('Should return 500 if sendTop10CitiesServie throws', async () => {
        const { sut, sendTop10CitiesServiceStub } = makeSut();
        jest.spyOn(
            sendTop10CitiesServiceStub,
            'execute',
        ).mockImplementationOnce(() => {
            throw new Error('any error');
        });
        const httpResponse = await sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual(serverError(new Error()));
    });

    test('Should return 200 if no error occurred', async () => {
        const {
            sut,
            top10CitiesCOVIDByStateServiceStub,
            sendTop10CitiesServiceStub,
        } = makeSut();
        jest.spyOn(
            top10CitiesCOVIDByStateServiceStub,
            'execute',
        ).mockReturnValueOnce(
            new Promise(resolve => resolve(makeFakeReturnTop10Cities())),
        );
        jest.spyOn(sendTop10CitiesServiceStub, 'execute').mockReturnValueOnce(
            new Promise(resolve => resolve(true)),
        );
        const httpResponse = await sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual(ok(makeFakeReturnTop10Cities()));
    });
});
