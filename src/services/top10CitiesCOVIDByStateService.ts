import axios from 'axios';

type params = {
    state: string;
    dateStart: Date;
    dateEnd: Date;
};

class top10CitiesCOVIDByStateService {
    async execute(data: params): Promise<any> {
        const { state, dateStart, dateEnd } = data;

        const dataApi = this.getDataApi({ state, dateStart, dateEnd });

        return dataApi;
    }

    private async getDataApi({
        state,
        dateStart,
        dateEnd,
    }: params): Promise<any> {
        const URL = 'https://api.brasil.io/dataset/covid19/caso/data/';
        const token = process.env.TOKEN;

        const response = await axios.get(URL, {
            params: {
                state,
                dateStart,
                dateEnd,
            },
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return response.data;
    }
}

export default top10CitiesCOVIDByStateService;
