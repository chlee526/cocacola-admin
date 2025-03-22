import { AxiosResponse } from 'axios';

import { request } from '@/shared/library';

import {
    DeleteCategoryRequestModel,
    DeleteKeywordRequestModel,
    GetCategoryResponseModel,
    GetKeywordRequestModel,
    GetKeywordResponseModel,
    GetOptionListResponseModel,
    PostCategoryRequestModel,
    PostExKeywordRequestModel,
    PostExKeywordResponseModel,
    PostKeywordRequestModel,
    PostOptionRequestModel,
    PutCategoryRequestModel,
    PutKeywordRequestModel,
} from '../model/model';

// 카테고리 조회
const getCategoryAsync = (): Promise<AxiosResponse<GetCategoryResponseModel>> => {
    return request({
        url: import.meta.env.VITE_API_KEYWORD_CATEGORY,
        method: 'get',
    });
};

// 카테고리 등록
const postCategoryAsync = (param: PostCategoryRequestModel) => {
    return request({
        url: import.meta.env.VITE_API_KEYWORD_CATEGORY,
        method: 'post',
        data: param,
    });
};

// 카테고리 수정
const putCategoryAsync = (param: PutCategoryRequestModel) => {
    return request({
        url: import.meta.env.VITE_API_KEYWORD_CATEGORY,
        method: 'put',
        data: param,
    });
};

// 카테고리 삭제
const deleteCategoryAsync = (param: DeleteCategoryRequestModel) => {
    return request({
        url: import.meta.env.VITE_API_KEYWORD_CATEGORY,
        method: 'delete',
        data: param,
    });
};

// 키워드&제외 키워드 조회
const getKeywordAsync = (param: GetKeywordRequestModel): Promise<AxiosResponse<GetKeywordResponseModel>> => {
    return request({
        url: import.meta.env.VITE_API_KEYWORD,
        method: 'get',
        params: param,
    });
};

// 키워드&제외 키워드 등록
const postKeywordAsync = (param: PostKeywordRequestModel) => {
    return request({
        url: import.meta.env.VITE_API_KEYWORD,
        method: 'post',
        data: param,
    });
};

// 제외 키워드 등록
const postExKeywordAsync = (param: PostExKeywordRequestModel[]): Promise<AxiosResponse<PostExKeywordResponseModel>> => {
    return request({
        url: import.meta.env.VITE_API_KEYWORD_EXKEYWORD,
        method: 'post',
        data: param,
    });
};

// 키워드&제외 키워드 수정
const putKeywordAsync = (param: PutKeywordRequestModel) => {
    return request({
        url: import.meta.env.VITE_API_KEYWORD,
        method: 'put',
        data: param,
    });
};

// 키워드&제외 키워드 삭제
const deleteKeywordAsync = (param: DeleteKeywordRequestModel) => {
    return request({
        url: import.meta.env.VITE_API_KEYWORD,
        method: 'delete',
        data: param,
    });
};

// 키워드&제외 키워드 옵션 조회
const getOptionListAsync = (): Promise<AxiosResponse<GetOptionListResponseModel>> => {
    return request({
        url: import.meta.env.VITE_API_KEYWORD_OPTIONS,
        method: 'get',
    });
};

// 키워드&제외 키워드 옵션 등록
const postOptionAsync = (param: PostOptionRequestModel) => {
    return request({
        url: import.meta.env.VITE_API_KEYWORD_OPTIONS,
        method: 'post',
        data: param,
    });
};

export {
    getCategoryAsync,
    postCategoryAsync,
    putCategoryAsync,
    deleteCategoryAsync,
    getKeywordAsync,
    postKeywordAsync,
    postExKeywordAsync,
    putKeywordAsync,
    deleteKeywordAsync,
    getOptionListAsync,
    postOptionAsync,
};
