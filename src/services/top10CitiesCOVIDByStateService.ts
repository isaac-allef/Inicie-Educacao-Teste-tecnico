type params = {
    state: string;
    dateStart: Date;
    dateEnd: Date;
};

class top10CitiesCOVIDByStateService {
    async execute(data: params): Promise<any> {
        return data;
    }
}

export default top10CitiesCOVIDByStateService;
