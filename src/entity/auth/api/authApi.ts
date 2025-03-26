import { AxiosResponse } from 'axios';

import { request } from '@/shared/library';

import { GetMyAuthResponseModel, PostLoginRequestModel, PostLoginResponseModel, UserModel } from '../model/authModel';

// 중복 로그인 체크
const duplicateLoginAsync = async (param: PostLoginRequestModel): Promise<AxiosResponse<PostLoginResponseModel>> => {
    console.log('중복 로그인 체크', param, import.meta.env.VITE_BASE_API + '/v1/login/duplicate');
    return request({
        url: import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_LOGIN_DUPLICATE,
        method: 'post',
        data: param,
    });
};

// 강제 로그인
const loginAsync = async (param: PostLoginRequestModel): Promise<AxiosResponse<PostLoginResponseModel>> => {
    return request({
        url: import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_LOGIN,
        method: 'post',
        data: param,
    });
};

// 사용자 정보
const fetchUserInfoAsync = async (): Promise<AxiosResponse<UserModel>> => {
    return request({
        url: import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_LOGIN,
        method: 'get',
        data: {},
    });
};

// 전체 권한
const fetchAllAuthAsync = async (): Promise<AxiosResponse> => {
    return request({
        url: import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_AUTH,
        method: 'get',
        data: {},
    });
};

// 나의 권한
const fetchMyAuthAsync = async (): Promise<AxiosResponse<GetMyAuthResponseModel>> => {
    console.log('내권한', import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_AUTH_MY);
    return request({
        url: import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_AUTH_MY,
        method: 'get',
        data: {},
    });
};

// 로그 아웃
const logoutAsync = async () => {
    return request({
        url: import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_LOGOUT,
        method: 'delete',
        data: {},
    });
};

export { duplicateLoginAsync, loginAsync, logoutAsync, fetchUserInfoAsync, fetchAllAuthAsync, fetchMyAuthAsync };
