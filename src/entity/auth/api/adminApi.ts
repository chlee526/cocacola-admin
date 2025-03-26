import { AxiosResponse } from 'axios';

import { request } from '@/shared/library';

import {
    DeleteAuthRequestModel,
    GetAuthRequestModel,
    GetAuthResponseModel,
    PostAuthRequestModel,
    PutAuthMultiRequestModel,
} from '../model/adminModel';

// 권한 목록
const getAuthListAsync = (param: GetAuthRequestModel): Promise<AxiosResponse<GetAuthResponseModel>> => {
    return request({
        url: import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_AUTH,
        method: 'get',
        params: param,
    });
};

// 특정 권한
const getAuthAsync = (param: number): Promise<AxiosResponse<GetAuthResponseModel>> => {
    return request({
        url: `${import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_AUTH}/${param}`,
        method: 'get',
    });
};

// 권한 등록
const postAuthAsync = (param: PostAuthRequestModel) => {
    return request({
        url: import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_AUTH,
        method: 'post',
        data: param,
    });
};

// 권한 수정
const putAuthAsync = (param: PostAuthRequestModel) => {
    return request({
        url: import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_AUTH,
        method: 'put',
        data: param,
    });
};
// 권한 수정(멀티 - state만 변경 가능)
const putMultiAuthAsync = (param: PutAuthMultiRequestModel[]) => {
    return request({
        url: import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_AUTH_STATE,
        method: 'put',
        data: param,
    });
};
// 권한 삭제
const deleteAuthAsync = (param: DeleteAuthRequestModel) => {
    return request({
        url: import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_AUTH,
        method: 'delete',
        data: param,
    });
};

export { getAuthListAsync, getAuthAsync, postAuthAsync, putAuthAsync, putMultiAuthAsync, deleteAuthAsync };
