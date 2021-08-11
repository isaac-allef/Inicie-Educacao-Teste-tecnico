/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

class sendTop10CitiesService {
    async execute(top10Cities: any[]): Promise<boolean> {
        const dataSent = top10Cities.map(async (city: any, index: number) => {
            const data = {
                id: index,
                nomeCidade: city.name,
                percentualDeCasos: city.percentageOfCases,
            };

            return this.postDataApi(data);
        });

        if (dataSent.length !== 10) {
            throw Error('Send top 10 cities fail');
        }

        return true;
    }

    private async postDataApi(data: any): Promise<any> {
        const URL =
            'https://us-central1-lms-nuvem-mestra.cloudfunctions.net/testApi';

        const response = await axios.post(URL, data, {
            headers: {
                'Content-Type': 'application/json',
                MeuNome: 'Isaac Allef Santos Cruz',
            },
        });

        return response.data;
    }
}

export default sendTop10CitiesService;
