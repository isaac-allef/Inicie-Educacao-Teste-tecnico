/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

type params = {
    state: string;
    dateStart: Date;
    dateEnd: Date;
};

class top10CitiesCOVIDByStateService {
    async execute(data: params): Promise<Array<any>> {
        const { state, dateStart } = data;

        const dataApi = await this.getDataApiBrasilIo(state, dateStart);

        const top10Cities = this.top10CitiesPercentageCasesByTotalPopulation(
            dataApi.results,
        );

        return top10Cities;
    }

    private top10CitiesPercentageCasesByTotalPopulation(
        arrayCities: any[],
    ): Array<any> {
        const compareByPercentageOfCases = (
            firstCity: any,
            secondCity: any,
        ) => {
            if (firstCity.percentageOfCases > secondCity.percentageOfCases) {
                return -1;
            }
            return 1;
        };

        let top10Cities: any[] = [];
        arrayCities.forEach((city: any) => {
            if (city.estimated_population && city.confirmed) {
                const percentageOfCases =
                    (city.confirmed * 100) / city.estimated_population;

                top10Cities.push({
                    name: city.city,
                    percentageOfCases,
                });

                top10Cities = top10Cities.sort(compareByPercentageOfCases);

                if (top10Cities[10]) {
                    top10Cities.pop();
                }
            }
        });

        return top10Cities;
    }

    private async getDataApiBrasilIo(
        state: string,
        dateStart: Date,
    ): Promise<any> {
        const URL = 'https://api.brasil.io/dataset/covid19/caso/data/';
        const token = process.env.TOKEN;

        const response = await axios.get(URL, {
            params: { state, date: dateStart.toISOString().split('T')[0] },
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return response.data;
    }
}

export default top10CitiesCOVIDByStateService;
