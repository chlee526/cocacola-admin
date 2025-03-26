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

const getReplacAsync = (param: GetReplaceRequestModel): Promise<AxiosResponse<GetReplaceResponseModel>> =>
    request({
        url: import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_REPLACE,
        method: 'get',
        params: param,
    });

const updateReplaceAsync = (param: UpdateReplaceRequestModel): Promise<AxiosResponse<UpdateReplaceResponseModel>> =>
    request({
        url: import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_REPLACE,
        method: 'put',
        data: param,
    });

const addReplaceAsync = (param: AddReplaceRequestModel): Promise<AxiosResponse<AddReplaceResponseModel>> =>
    request({
        url: import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_REPLACE,
        method: 'post',
        data: param,
    });

const deleteReplaceAsync = (param: DeleteReplaceRequestModel): Promise<AxiosResponse<DeleteReplaceResponseModel>> =>
    request({
        url: import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_REPLACE,
        method: 'delete',
        data: param,
    });

export { getReplacAsync, updateReplaceAsync, addReplaceAsync, deleteReplaceAsync };
