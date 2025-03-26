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

const URL = import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_RECEIVER;
const RECEIVER_DUPLICATE = import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_RECEIVER_DUPLICATE;
const RECEIVER_EXCEL = import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_RECEIVER_EXCEL;

// 정보 수신자 목록
const getReceiverListAsync = (param: GetReceiverRequestModel): Promise<AxiosResponse<GetReceiverResponseModel>> => {
    return request({
        url: URL,
        method: 'get',
        params: param,
    });
};

// 정보 수신자(단일)
const getReceiverAsync = (param: number): Promise<AxiosResponse<GetReceiverResponseModel>> => {
    return request({
        url: `${URL}/${param}`,
        method: 'get',
    });
};

// 정보 수신자 등록
const postReceiverAsync = (param: PostReceiverRequestModel) => {
    return request({
        url: URL,
        method: 'post',
        data: param,
    });
};

// 정보 수신자 수정
const putReceiverAsync = (param: PutReceiverRequestModel) => {
    return request({
        url: URL,
        method: 'put',
        data: param,
    });
};

// 권한 삭제
const deleteReceiverAsync = (param: DeleteReceiverRequestModel) => {
    return request({
        url: URL,
        method: 'delete',
        data: param,
    });
};

// 이메일 중복 검사
const getReceiverDuplicateAsync = (param: GetReceiverDuplicateRequestModel) => {
    return request({
        url: RECEIVER_DUPLICATE,
        method: 'get',
        params: param,
    });
};

// 정보 수신자 등록(Excel)
const postReceiverExcelAsync = (param: PostReceiverRequestModel[]) => {
    return request({
        url: RECEIVER_EXCEL,
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
