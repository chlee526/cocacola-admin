import { AxiosResponse } from 'axios';

import { request } from '@/shared/library';

import {
    AddReplaceRequestModel,
    AddReplaceResponseModel,
    DeleteReplaceRequestModel,
    DeleteReplaceResponseModel,
    GetReplaceRequestModel,
    GetReplaceResponseModel,
    UpdateReplaceRequestModel,
    UpdateReplaceResponseModel,
} from '../model/replaceModel';

const getReplacAsync = (
    param: GetReplaceRequestModel,
): Promise<AxiosResponse<GetReplaceResponseModel>> =>
    request({
        url: '/v1/replace',
        method: 'get',
        params: param,
    });

const updateReplaceAsync = (
    param: UpdateReplaceRequestModel,
): Promise<AxiosResponse<UpdateReplaceResponseModel>> =>
    request({
        url: '/v1/replace',
        method: 'put',
        data: param,
    });

const addReplaceAsync = (
    param: AddReplaceRequestModel,
): Promise<AxiosResponse<AddReplaceResponseModel>> =>
    request({
        url: '/v1/replace',
        method: 'post',
        data: param,
    });

const deleteReplaceAsync = (
    param: DeleteReplaceRequestModel,
): Promise<AxiosResponse<DeleteReplaceResponseModel>> =>
    request({
        url: '/v1/replace',
        method: 'delete',
        data: param,
    });

export { getReplacAsync, updateReplaceAsync, addReplaceAsync, deleteReplaceAsync };
