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

const SITE_ALL = import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_SITE_ALL_LIST;
const SITE_MAPPING = import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_SITE_MAPPING;
const SITE_CHNS = import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_SITE_CHNS;

const siteListAsync = (): Promise<AxiosResponse<SiteResonseModel<SiteListModel[]>>> => {
    return request({
        url: SITE_ALL,
        method: 'get',
        data: {},
    });
};
const siteListSelectAsync = (): Promise<AxiosResponse<SiteResonseModel<SiteListModel[]>>> => {
    return request({
        url: SITE_MAPPING,
        method: 'get',
        data: {},
    });
};

const siteMoveAsync = (params: SiteMoveReqeustModel): Promise<AxiosResponse<SiteResonseModel<null>>> => {
    return request({
        url: SITE_MAPPING,
        method: params.type,
        data: params,
    });
};

const siteGrpListAsync = (): Promise<AxiosResponse<SiteResonseModel<SiteGrpResponseType[]>>> => {
    console.log('목록 리스트 APi');
    return request({
        url: SITE_CHNS,
        method: 'get',
        data: {},
    });
};

const siteGrpAddAsync = (params: SiteGrpAddReqeustModel): Promise<AxiosResponse<SiteResonseModel<null>>> => {
    return request({
        url: SITE_CHNS,
        method: 'post',
        data: params,
    });
};

const siteGrpMdfyAsync = (params: SiteGrpMdfyReqeustModel): Promise<AxiosResponse<SiteResonseModel<null>>> => {
    return request({
        url: SITE_CHNS,
        method: 'put',
        data: params,
    });
};

const siteGrpDelAsync = (params: SiteGrpDelReqeustModel): Promise<AxiosResponse<SiteResonseModel<null>>> => {
    return request({
        url: SITE_CHNS,
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
