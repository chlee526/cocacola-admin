import { AxiosResponse } from 'axios';

import { request } from '@/shared/library';

import { GetHistoryRequestModel, GetHistoryResponseModel } from '../model/historyModel';

const getHistoryAsync = (
    param: GetHistoryRequestModel,
): Promise<AxiosResponse<GetHistoryResponseModel>> =>
    request({
        url: '/v1/history/login',
        method: 'get',
        params: param,
    });

export { getHistoryAsync };
