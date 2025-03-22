import { AxiosResponse } from 'axios';

import { request } from '@/shared/library';

import {
    DeleteReceiverRequestModel,
    GetReceiverDuplicateRequestModel,
    GetReceiverRequestModel,
    GetReceiverResponseModel,
    PostReceiverRequestModel,
    PutReceiverRequestModel,
} from '../model/model';

// 정보 수신자 목록
const getReceiverListAsync = (param: GetReceiverRequestModel): Promise<AxiosResponse<GetReceiverResponseModel>> => {
    return request({
        url: import.meta.env.VITE_API_RECEIVER,
        method: 'get',
        params: param,
    });
};

// 정보 수신자(단일)
const getReceiverAsync = (param: number): Promise<AxiosResponse<GetReceiverResponseModel>> => {
    return request({
        url: `${import.meta.env.VITE_API_RECEIVER}/${param}`,
        method: 'get',
    });
};

// 정보 수신자 등록
const postReceiverAsync = (param: PostReceiverRequestModel) => {
    return request({
        url: import.meta.env.VITE_API_RECEIVER,
        method: 'post',
        data: param,
    });
};

// 정보 수신자 수정
const putReceiverAsync = (param: PutReceiverRequestModel) => {
    return request({
        url: import.meta.env.VITE_API_RECEIVER,
        method: 'put',
        data: param,
    });
};

// 권한 삭제
const deleteReceiverAsync = (param: DeleteReceiverRequestModel) => {
    return request({
        url: import.meta.env.VITE_API_RECEIVER,
        method: 'delete',
        data: param,
    });
};

// 이메일 중복 검사
const getReceiverDuplicateAsync = (param: GetReceiverDuplicateRequestModel) => {
    return request({
        url: import.meta.env.VITE_API_RECEIVER_DUPLICATE,
        method: 'get',
        params: param,
    });
};

// 정보 수신자 등록(Excel)
const postReceiverExcelAsync = (param: PostReceiverRequestModel[]) => {
    return request({
        url: import.meta.env.VITE_API_RECEIVER_EXCEL,
        method: 'post',
        data: param,
    });
};

export {
    getReceiverListAsync,
    getReceiverAsync,
    postReceiverAsync,
    putReceiverAsync,
    deleteReceiverAsync,
    getReceiverDuplicateAsync,
    postReceiverExcelAsync,
};
