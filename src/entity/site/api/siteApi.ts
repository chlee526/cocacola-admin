import { AxiosResponse } from 'axios';

import { request } from '@/shared/library';

import {
    SiteGrpAddReqeustModel,
    SiteGrpDelReqeustModel,
    SiteGrpMdfyReqeustModel,
    SiteGrpResponseType,
    SiteListModel,
    SiteMoveReqeustModel,
    SiteResonseModel,
} from '../model/siteModel';

// const siteListAsync = async (brdType: SiteType): Promise<SiteListModel[]> => {
// : Promise<AxiosResponse<GetReplaceResponseModel>>
const siteListAsync = (): Promise<AxiosResponse<SiteResonseModel<SiteListModel[]>>> => {
    return request({
        url: import.meta.env.VITE_API_SITE_ALL_LIST,
        method: 'get',
        data: {},
    });
};
const siteListSelectAsync = (): Promise<AxiosResponse<SiteResonseModel<SiteListModel[]>>> => {
    return request({
        url: import.meta.env.VITE_API_SITE_MAPPING,
        method: 'get',
        data: {},
    });
};

// const siteMoveAsync = async (params: SiteMoveReqeustModel): Promise<SiteResonseModel> => {
const siteMoveAsync = (
    params: SiteMoveReqeustModel,
): Promise<AxiosResponse<SiteResonseModel<null>>> => {
    return request({
        url: import.meta.env.VITE_API_SITE_MAPPING,
        method: params.type,
        data: params,
    });
};

const siteGrpListAsync = (): Promise<AxiosResponse<SiteResonseModel<SiteGrpResponseType[]>>> => {
    console.log('목록 리스트 APi');
    return request({
        url: import.meta.env.VITE_API_SITE_CHNS,
        method: 'get',
        data: {},
    });
};

const siteGrpAddAsync = (
    params: SiteGrpAddReqeustModel,
): Promise<AxiosResponse<SiteResonseModel<null>>> => {
    return request({
        url: import.meta.env.VITE_API_SITE_CHNS,
        method: 'post',
        data: params,
    });
};

const siteGrpMdfyAsync = (
    params: SiteGrpMdfyReqeustModel,
): Promise<AxiosResponse<SiteResonseModel<null>>> => {
    return request({
        url: import.meta.env.VITE_API_SITE_CHNS,
        method: 'put',
        data: params,
    });
};

const siteGrpDelAsync = (
    params: SiteGrpDelReqeustModel,
): Promise<AxiosResponse<SiteResonseModel<null>>> => {
    return request({
        url: import.meta.env.VITE_API_SITE_CHNS,
        method: 'delete',
        data: params,
    });
};

export {
    siteListAsync,
    siteListSelectAsync,
    siteMoveAsync,
    siteGrpListAsync,
    siteGrpAddAsync,
    siteGrpMdfyAsync,
    siteGrpDelAsync,
};
