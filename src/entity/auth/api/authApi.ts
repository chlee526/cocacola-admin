import { AxiosResponse } from 'axios';

import { request } from '@/shared/library';

import {
    GetMyAuthResponseModel,
    PostLoginRequestModel,
    PostLoginResponseModel,
    UserModel,
} from '../model/authModel';

// 중복 로그인 체크
const duplicateLoginAsync = async (
    param: PostLoginRequestModel,
): Promise<AxiosResponse<PostLoginResponseModel>> => {
    return request({
        url: 'v1/login/duplicate',
        method: 'post',
        data: param,
    });
};

// 강제 로그인
const loginAsync = async (
    param: PostLoginRequestModel,
): Promise<AxiosResponse<PostLoginResponseModel>> => {
    return request({
        url: 'v1/login',
        method: 'post',
        data: param,
    });
};

// 사용자 정보
const fetchUserInfoAsync = async (): Promise<AxiosResponse<UserModel>> => {
    return request({
        url: 'v1/login',
        method: 'get',
        data: {},
    });
};

// 전체 권한
const fetchAllAuthAsync = async (): Promise<AxiosResponse> => {
    return request({
        url: 'v1/auth',
        method: 'get',
        data: {},
    });
};

// 나의 권한
const fetchMyAuthAsync = async (): Promise<AxiosResponse<GetMyAuthResponseModel>> => {
    return request({
        url: 'v1/auth/my',
        method: 'get',
        data: {},
    });
};

// 로그 아웃
const logoutAsync = async () => {
    return request({
        url: 'v1/logout',
        method: 'delete',
        data: {},
    });
};

export {
    duplicateLoginAsync,
    loginAsync,
    logoutAsync,
    fetchUserInfoAsync,
    fetchAllAuthAsync,
    fetchMyAuthAsync,
};
