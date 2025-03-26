import { AxiosResponse } from 'axios';

import { request } from '@/shared/library';

import { GetHistoryRequestModel, GetHistoryResponseModel } from '../model/historyModel';

const URL = import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_HISTORY;

const getHistoryAsync = (param: GetHistoryRequestModel): Promise<AxiosResponse<GetHistoryResponseModel>> =>
    request({
        url: URL,
        method: 'get',
        params: param,
    });

export { getHistoryAsync };
