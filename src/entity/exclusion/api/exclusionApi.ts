import { AxiosResponse } from 'axios';

import { request } from '@/shared/library';

import {
    AddExclusionRequestModel,
    DeleteExclusionRequestModel,
    GetExclusionRequestModel,
    GetExclusionResponseModel,
    GetExclusionSeqResponseModel,
    ResponseModel,
    UpdateExclusionRequestModel,
} from '../model/model';

const URL = import.meta.env.VITE_API_EXCLUSION;

/**
 * 전체 제외 키워드 목록 조회
 */
const getExclusionAsync = (
    params: GetExclusionRequestModel,
): Promise<AxiosResponse<GetExclusionResponseModel>> =>
    request({
        url: URL,
        method: 'get',
        params,
    });

/**
 * 제외 키워드 `seq`로 조회
 */
const getExclusionSeqAsync = (seq: number): Promise<AxiosResponse<GetExclusionSeqResponseModel>> =>
    request({
        url: `${URL}/${seq}`,
        method: 'get',
    });

/**
 * 제외 키워드 수정
 */
const putExclusionAsync = (
    data: UpdateExclusionRequestModel,
): Promise<AxiosResponse<ResponseModel>> =>
    request({
        url: URL,
        method: 'put',
        data,
    });

/**
 * 제외 키워드 추가
 */
const addExclusionAsync = (data: AddExclusionRequestModel): Promise<AxiosResponse<ResponseModel>> =>
    request({
        url: URL,
        method: 'post',
        data,
    });

/**
 * 제외 키워드 삭제
 */
const deleteExclusionAsync = (
    data: DeleteExclusionRequestModel,
): Promise<AxiosResponse<ResponseModel>> =>
    request({
        url: URL,
        method: 'delete',
        data,
    });

export {
    getExclusionAsync,
    getExclusionSeqAsync,
    putExclusionAsync,
    addExclusionAsync,
    deleteExclusionAsync,
};
